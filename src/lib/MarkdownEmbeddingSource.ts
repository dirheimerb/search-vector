import { BaseEmbeddingSource } from "./BaseEmbeddingSource";
import { readFile } from "fs/promises";
import { processMdxForSearch } from "./processMdxForSearch";

/**
 * @name MarkdownEmbeddingSource
 * @description Embedding source for Markdown files
 * @class
 * @extends BaseEmbeddingSource
 * @property {string} type
 * @property {string} filePath
 * @property {string} [parentFilePath]
 * @method load
 * @example
 * import { MarkdownEmbeddingSource } from './MarkdownEmbeddingSource'
 *
 * const source = new MarkdownEmbeddingSource('...', 'src/pages/foo.md')
 *
 * const { checksum, meta, sections } = await source.load()
 *
 * console.log(checksum, meta, sections)
 */
export class MarkdownEmbeddingSource extends BaseEmbeddingSource {
  type: "markdown" = "markdown";

  constructor(
    source: string,
    public filePath: string,
    public parentFilePath?: string,
  ) {
    const path = filePath.replace(/^pages/, "").replace(/\.mdx?$/, "");
    const parentPath = parentFilePath
      ?.replace(/^pages/, "")
      .replace(/\.mdx?$/, "");

    super(source, path, parentPath);
  }

  async load() {
    const contents = await readFile(this.filePath, "utf8");

    const { checksum, meta, sections } = processMdxForSearch(contents);

    this.checksum = checksum;
    this.meta = meta;
    this.sections = sections;

    return {
      checksum,
      meta,
      sections,
    };
  }
}
