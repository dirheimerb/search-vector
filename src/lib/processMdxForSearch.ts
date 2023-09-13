import { createHash } from "crypto";
import { fromMarkdown } from "mdast-util-from-markdown";
import { mdxFromMarkdown } from "mdast-util-mdx";
import { toMarkdown } from "mdast-util-to-markdown";
import { mdxjs } from "micromark-extension-mdxjs";
import { filter } from "unist-util-filter";
import { extractMetaExport } from "./extractMetaExport";
import { splitTreeBy } from "./splitTreeBy";
import { ProcessedMdx } from "./types";
import GithubSlugger from "github-slugger";

/**
 * @name processMdxForSearch
 * @description Processes MDX for search
 * @param {string} content
 * @returns {ProcessedMdx}
 * @example
 * import { processMdxForSearch } from './processMdxForSearch'
 *
 * const content = `
 * ---
 * title: Hello, world!
 * ---
 *
 * # Hello, world!
 *
 * This is a test.
 * `
 */
export function processMdxForSearch(content: string): ProcessedMdx {
  const checksum = createHash("sha256").update(content).digest("base64");

  const mdxTree = fromMarkdown(content, {
    extensions: [mdxjs()],
    mdastExtensions: [mdxFromMarkdown()],
  });

  const meta = extractMetaExport(mdxTree);

  // Remove all MDX elements from markdown
  const mdTree = filter(
    mdxTree,
    (node) =>
      ![
        "mdxjsEsm",
        "mdxJsxFlowElement",
        "mdxJsxTextElement",
        "mdxFlowExpression",
        "mdxTextExpression",
      ].includes(node.type),
  );

  if (!mdTree) {
    return {
      checksum,
      meta,
      sections: [],
    };
  }

  const sectionTrees = splitTreeBy(mdTree, (node) => node.type === "heading");

  const slugger = new GithubSlugger();

  const sections = sectionTrees.map((tree) => {
    const [firstNode] = tree.children;

    const heading =
      firstNode.type === "heading" ? String(firstNode) : undefined;
    const slug = heading ? slugger.slug(heading) : undefined;

    return {
      content: toMarkdown(tree),
      heading,
      slug,
    };
  });

  return {
    checksum,
    meta,
    sections,
  };
}
