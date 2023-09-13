import { Root } from "mdast";
import { MdxjsEsm } from "mdast-util-mdx";
import { getObjectFromExpression } from "./getObjectFromExpression";

/**
 * @name extractMetaExport
 * @description Extracts the meta export from the MDX tree
 * @param {Root} mdxTree
 * @returns {Record<string, string | number | bigint | true | RegExp | undefined> | undefined}
 */
export function extractMetaExport(
  mdxTree: Root,
):
  | Record<string, string | number | bigint | true | RegExp | undefined>
  | undefined {
  const metaExportNode = mdxTree.children.find((node): node is MdxjsEsm => {
    return (
      node.type === "mdxjsEsm" &&
      node.data?.estree?.body[0]?.type === "ExportNamedDeclaration" &&
      node.data.estree.body[0].declaration?.type === "VariableDeclaration" &&
      node.data.estree.body[0].declaration.declarations[0]?.id.type ===
        "Identifier" &&
      node.data.estree.body[0].declaration.declarations[0].id.name === "meta"
    );
  });

  if (!metaExportNode) {
    return undefined;
  }

  const objectExpression =
    (metaExportNode.data?.estree?.body[0]?.type === "ExportNamedDeclaration" &&
      metaExportNode.data.estree.body[0].declaration?.type ===
        "VariableDeclaration" &&
      metaExportNode.data.estree.body[0].declaration.declarations[0]?.id
        .type === "Identifier" &&
      metaExportNode.data.estree.body[0].declaration.declarations[0].id.name ===
        "meta" &&
      metaExportNode.data.estree.body[0].declaration.declarations[0].init
        ?.type === "ObjectExpression" &&
      metaExportNode.data.estree.body[0].declaration.declarations[0].init) ||
    undefined;

  if (!objectExpression) {
    return undefined;
  }

  return getObjectFromExpression(objectExpression);
}
