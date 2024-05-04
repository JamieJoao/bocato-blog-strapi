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