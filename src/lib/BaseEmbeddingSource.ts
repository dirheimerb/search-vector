import { Meta, Section } from "./types";

/**
 * @name BaseEmbeddingSource
 * @description Base class for embedding sources
 * @abstract
 * @class
 * @property {string} source
 * @property {string} path
 * @property {string} [parentPath]
 * @property {string} [checksum]
 * @property {Meta} [meta]
 * @property {Section[]} [sections]
 * @method load
 * @example
 * import { BaseEmbeddingSource } from './BaseEmbeddingSource'
 *
 * class MyEmbeddingSource extends BaseEmbeddingSource {
 *    async load() {
 *      ...
 *   }
 * }
 */
export abstract class BaseEmbeddingSource {
  checksum?: string;
  meta?: Meta;
  sections?: Section[];

  constructor(
    public source: string,
    public path: string,
    public parentPath?: string,
  ) {}

  abstract load(): Promise<{
    checksum: string;
    meta?: Meta;
    sections: Section[];
  }>;
}
