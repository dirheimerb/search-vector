import { extractMetaExport } from "./extractMetaExport";

/**
 * @name Meta
 * @description The meta export from the MDX tree
 * @property {string} title
 * @property {string} [description]
 * @property {string} [image]
 * @property {string} [date]
 * @property {string} [updated]
 * @property {string} [slug]
 * @property {string} [author]
 * @property {string} [tags]
 * @property {string} [draft]
 * @property {string} [type]
 * @property {string} [layout]
 * @property {string} [category]
 * @property {string} [keywords]
 * @property {string} [canonical]
 * @property {string} [noindex]
 * @property {string} [nofollow]
 * @property {string} [redirect]
 * @property {string} [prev]
 * @property {string} [next]
 * @property {string} [published]
 * @property {string} [unlisted]
 * @property {string} [noindex]
 * @property {string} [nofollow]
 * @property {string} [redirect]
 *
 */
export type Meta = ReturnType<typeof extractMetaExport>;

/**
 * @name Section
 * @description A section of the MDX tree
 * @property {string} content
 * @property {string} [heading]
 * @property {string} [slug]
 */
export type Section = {
  content: string;
  heading?: string;
  slug?: string;
};
/**
 * @name ProcessedMdx
 * @description The processed MDX tree
 * @property {string} checksum
 * @property {Meta} meta
 * @property {Section[]} sections
 */
export type ProcessedMdx = {
  checksum: string;
  meta: Meta;
  sections: Section[];
};

/**
 * @name WalkEntry
 * @description An entry in the walk
 * @property {string} path
 * @property {string} [parentPath]
 */
export type WalkEntry = {
  path: string;
  parentPath?: string;
};

export interface EmbeddingResponse {
  data: {
    embedding: number[];
    index: number;
    object: string;
  }[];
  model: string;
  object: string;
  usage: {
    prompt_tokens: number;
    total_tokens: number;
  }; 
}
