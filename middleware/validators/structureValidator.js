function checkDepth(value, currentDepth) {
  if (value === null || typeof value !== "object") return currentDepth;

  let maxDepth = currentDepth;

  for (const key in value) {
    const childDepth = checkDepth(value[key], currentDepth + 1);
    if (childDepth > maxDepth) maxDepth = childDepth;
  }

  return maxDepth;
}

function validateStructure(data, schema) {
  const issues = [];

  for (const field in schema) {
    const value = data[field];
    if (value === undefined) continue;

    const depth = checkDepth(value, 0);

    // normal field value hobe depth 0 (plain string/number)
    // depth 1+ mane kono na kono nested object ache, ja login/search er
    // moto simple field e thakar kotha na
    if (depth > 0) {
      issues.push({
        field,
        reason: "unexpected_nesting",
        depth,
        points: 15
      });
    }
  }

  return issues;
}

module.exports = validateStructure;