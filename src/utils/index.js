/**
 * Recursively finds all paths in an object that lead to a specific value.
 *
 * @param {object} object - The object to search.
 * @param {*} value - The value to find.
 * @param {Array} [path=[]] - The current path (used internally during recursion).
 * @returns {Array} - An array of paths leading to the specified value.
 * example:
 * const object = {
 *  a: {
 *   b: {
 *   c: 1
 *  }
 * },
 * d: 1
 * };
 * findAllPaths(object, 1);
 * // => [['a', 'b', 'c'], ['d']]
 * findAllPaths(object, 2);
 * // => []
 * findAllPaths(object, 1, ['a']);
 * // => [['a', 'b', 'c']]
 * findAllPaths(object, 1, ['d']);
 * // => [['d']]
 */
function findAllPaths(object, value, path = []) {
  let results = [];
  for (let [key, val] of Object.entries(object)) {
    if (val === value) {
      results.push([...path, key]);
    } else if (Array.isArray(val)) {
      for (let i = 0; i < val.length; i++) {
        const result = findAllPaths(val[i], value, [...path, key, i]);
        if (result.length > 0) {
          results = [...results, ...result];
        }
      }
    } else if (typeof val === 'object' && val !== null) {
      const result = findAllPaths(val, value, [...path, key]);
      if (result.length > 0) {
        results = [...results, ...result];
      }
    }
  }
  return results;
}

module.exports = {
  findAllPaths
}