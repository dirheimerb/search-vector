import yargs from "yargs";
import { MarkdownEmbeddingSource } from "./MarkdownEmbeddingSource";
import { createClient } from "@supabase/supabase-js";
import { walk } from "./walk";
import { ignoredFiles } from "./constants";
import "openai";
import { Configuration, OpenAIApi } from "openai-edge";

import { EmbeddingResponse } from "./types";
type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;
type UnwrapPromise<T> = T extends PromiseLike<infer U> ? U : T;

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

/**
 * @name generateEmbeddings
 * @description Generates embeddings for all pages
 * @returns {Promise<void>}
 * @example
 * import { generateEmbeddings } from './generateEmbeddings'
 *
 * await generateEmbeddings()
 *
 */
export async function generateEmbeddings(): Promise<void> {
  const argv = await yargs.option("refresh", {
    alias: "r",
    description: "Refresh data",
    type: "boolean",
  }).argv;

  const shouldRefresh = argv.refresh;

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY ||
    !process.env.OPENAI_KEY
  ) {
    return console.log(
      "Environment variables NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, and OPENAI_KEY are required: skipping embeddings generation",
    );
  }

  const supabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );
  type EmbeddingSource = MarkdownEmbeddingSource;

  const embeddingSources: EmbeddingSource[] = [
    ...(await walk("docs"))
      .filter(({ path }) => /\.mdx?$/.test(path))
      .filter(({ path }) => !ignoredFiles.includes(path))
      .map((entry) => new MarkdownEmbeddingSource("guide", entry.path)),
  ];
  console.log(`Discovered ${embeddingSources.length} pages`);

  if (!shouldRefresh) {
    console.log("Checking which pages are new or have changed");
  } else {
    console.log("Refresh flag set, re-generating all pages");
  }

  for (const embeddingSource of embeddingSources) {
    const { type, source, path, parentPath } = embeddingSource;

    try {
      const { checksum, meta, sections } = await embeddingSource.load();

      // Check for existing page in DB and compare checksums
      const { error: fetchPageError, data: existingPage } = await supabaseClient
        .from("nods_page")
        .select("id, path, checksum, parentPage:parent_page_id(id, path)")
        .filter("path", "eq", path)
        .limit(1)
        .maybeSingle();

      if (fetchPageError) {
        throw fetchPageError;
      }

      type Singular<T> = T extends any[] ? undefined : T;
      type ExistingPageProps = {
        parent_page_id?: number | null;
        path?: string | null;
        checksum?: string | null;
        meta?: Json | null;
        type?: string | null;
        source?: string | null;
      } & {
        parentPage?: {
          id?: number | null;
          path?: string | null;
        } | null;
      };

      // We use checksum to determine if this page & its sections need to be regenerated
      if (!shouldRefresh && existingPage?.checksum === checksum) {
        const existingParentPage: ExistingPageProps =
          existingPage?.parentPage as ExistingPageProps;

        // If parent page changed, update it
        if (existingParentPage?.path !== parentPath) {
          console.log(
            `[${path}] Parent page has changed. Updating to '${parentPath}'...`,
          );
          const { error: fetchParentPageError, data: parentPage } =
            await supabaseClient
              .from("nods_page")
              .select()
              .filter("path", "eq", parentPath)
              .limit(1)
              .maybeSingle();

          if (fetchParentPageError) {
            throw fetchParentPageError;
          }

          const { error: updatePageError } = await supabaseClient
            .from("nods_page")
            .update({ parent_page_id: parentPage?.id })
            .filter("id", "eq", existingPage?.id);

          if (updatePageError) {
            throw updatePageError;
          }
        }
        continue;
      }

      if (existingPage) {
        if (!shouldRefresh) {
          console.log(
            `[${path}] Docs have changed, removing old page sections and their embeddings`,
          );
        } else {
          console.log(
            `[${path}] Refresh flag set, removing old page sections and their embeddings`,
          );
        }

        const { error: deletePageSectionError } = await supabaseClient
          .from("nods_page_section")
          .delete()
          .filter("page_id", "eq", existingPage.id);

        if (deletePageSectionError) {
          throw deletePageSectionError;
        }
      }

      const { error: fetchParentPageError, data: parentPage } =
        await supabaseClient
          .from("nods_page")
          .select()
          .filter("path", "eq", parentPath)
          .limit(1)
          .maybeSingle();

      if (fetchParentPageError) {
        throw fetchParentPageError;
      }

      // Create/update page record. Intentionally clear checksum until we
      // have successfully generated all page sections.
      const { error: upsertPageError, data: page } = await supabaseClient
        .from("nods_page")
        .upsert(
          {
            checksum: null,
            path,
            type,
            source,
            meta,
            parent_page_id: parentPage?.id,
          },
          { onConflict: "path" },
        )
        .select()
        .limit(1)
        .single();

      if (upsertPageError) {
        throw upsertPageError;
      }

      console.log(
        `[${path}] Adding ${sections.length} page sections (with embeddings)`,
      );
      for (const { slug, heading, content } of sections) {
        // OpenAI recommends replacing newlines with spaces for best results (specific to embeddings)
        const input = content.replace(/\n/g, " ");

        try {
          const configuration = new Configuration({
            apiKey: process.env.OPENAI_KEY,
          });
          const openai = new OpenAIApi(configuration);

          const rawResponse = await openai.createEmbedding({
            model: "text-embedding-ada-002",
            input,
          });
          
          if (!rawResponse.ok) {
            throw new Error('API request failed');
          }
          
          const embeddingResponseData: EmbeddingResponse = await rawResponse.json();

          const [responseData] = embeddingResponseData.data;

          const { error: insertPageSectionError, data: pageSection } =
            await supabaseClient
              .from("nods_page_section")
              .insert({
                page_id: page.id,
                slug,
                heading,
                content,
                token_count: embeddingResponseData.usage.total_tokens,
                embedding: responseData.embedding,
              })
              .select()
              .limit(1)
              .single();

          if (insertPageSectionError) {
            throw insertPageSectionError;
          }
        } catch (err) {
          console.error(
            `Failed to generate embeddings for '${path}: '[${path}] Failed to generate embedding for section '${slug}': '${input.slice(
              0,
              40,
            )}`,
          );
          console.error(err);
          throw err;
        }
      }

      // Set page checksum so that we know this page was stored successfully
      const { error: updatePageError } = await supabaseClient
        .from("nods_page")
        .update({ checksum })
        .filter("id", "eq", page.id);

      if (updatePageError) {
        throw updatePageError;
      }
    } catch (err) {
      console.error(
        `Page '${path}' or one/multiple of its page sections failed to store properly. Page has been marked with null checksum to indicate that it needs to be re-generated.`,
      );
      console.error(err);
    }
  }

  console.log("Embedding generation complete");
}
