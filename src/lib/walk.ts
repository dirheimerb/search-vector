import { readdir, stat } from "fs/promises";
import { basename, dirname, join } from "path";
import { WalkEntry } from "./types";

/**
 * @name walk
 * @description Walks a directory and returns a list of files
 * @param {string} dir
 * @param {string} [parentPath]
 * @returns {Promise<WalkEntry[]>}
 * @example
 * import { walk } from './walk'
 *
 * const files = await walk('src')
 *
 * console.log(files)
 */
export async function walk(
  dir: string,
  parentPath?: string,
): Promise<WalkEntry[]> {
  const immediateFiles = await readdir(dir);

  const recursiveFiles = await Promise.all(
    immediateFiles.map(async (file) => {
      const path = join(dir, file);
      const stats = await stat(path);
      if (stats.isDirectory()) {
        // Keep track of document hierarchy (if this dir has corresponding doc file)
        const docPath = `${basename(path)}.mdx`;

        return walk(
          path,
          immediateFiles.includes(docPath)
            ? join(dirname(path), docPath)
            : parentPath,
        );
      } else if (stats.isFile()) {
        return [
          {
            path: path,
            parentPath,
          },
        ];
      } else {
        return [];
      }
    }),
  );

  const flattenedFiles = recursiveFiles.reduce(
    (all, folderContents) => all.concat(folderContents),
    [],
  );

  return flattenedFiles.sort((a: { path: string }, b: { path: string }) =>
    a.path.localeCompare(b.path),
  );
}
