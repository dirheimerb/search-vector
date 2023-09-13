import { Root, RootContent } from "mdast";
import { u } from "unist-builder";

/**
 * @name splitTreeBy
 * @description Splits a tree by a predicate
 * @param {Root} tree
 * @param {(node: RootContent) => boolean} predicate
 * @returns {Root[]}
 * @example
 * import { splitTreeBy } from './splitTreeBy'
 *
 * const tree = u('root', [
 *  u('heading', { depth: 1 }, [u('text', 'Heading 1')]),
 * u('heading', { depth: 2 }, [u('text', 'Heading 2')]),
 * u('heading', { depth: 1 }, [u('text', 'Heading 3')]),
 */
export function splitTreeBy(
  tree: Root,
  predicate: (node: RootContent) => boolean,
): Root[] {
  return tree.children.reduce<Root[]>((trees, node) => {
    const [lastTree] = trees.slice(-1);

    if (!lastTree || predicate(node)) {
      const tree: Root = u("root", [node]);
      return trees.concat(tree);
    }

    lastTree.children.push(node);
    return trees;
  }, []);
}
