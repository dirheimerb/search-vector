import { ObjectExpression } from "estree";

/**
 * @name getObjectFromExpression
 * @description Returns an object from an ObjectExpression node
 * @param {ObjectExpression} node
 * @returns {Record<string, string | number | bigint | true | RegExp | undefined>}
 * @example
 * import { getObjectFromExpression } from './getObjectFromExpression'
 *
 * const object = getObjectFromExpression({
 *     type: 'ObjectExpression',
 *     properties: [
 *    {
 *      type: 'Property',
 *      key: {
 *          type: 'Identifier',
 *          name: 'foo'
 *      },
 *  value: {
 *  type: 'Literal',
 *  value: 'bar'
 *      }
 *    }
 *   ]
 * })
 */
export function getObjectFromExpression(
  node: ObjectExpression,
): Record<string, string | number | bigint | true | RegExp | undefined> {
  return node.properties.reduce<
    Record<string, string | number | bigint | true | RegExp | undefined>
  >((object, property) => {
    if (property.type !== "Property") {
      return object;
    }

    const key =
      (property.key.type === "Identifier" && property.key.name) || undefined;
    const value =
      (property.value.type === "Literal" && property.value.value) || undefined;

    if (!key) {
      return object;
    }

    return {
      ...object,
      [key]: value,
    };
  }, {});
}
