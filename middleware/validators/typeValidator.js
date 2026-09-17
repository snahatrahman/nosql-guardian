function validateTypes(data, schema) {
  const issues = [];

  for (const field in schema) {
    const rule = schema[field];
    const value = data[field];

    if (value === undefined) continue;

    const actualType = typeof value;

    if (rule.type === "string" && actualType !== "string") {
      issues.push({
        field,
        reason: "type_mismatch",
        expected: "string",
        got: actualType,
        points: 40
      });
    }
  }

  return issues;
}

module.exports = validateTypes;