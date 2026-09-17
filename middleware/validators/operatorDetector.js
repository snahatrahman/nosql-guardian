const OPERATOR_RULES = {
  "$where": 100,
  "$ne": 30,
  "$gt": 30,
  "$gte": 30,
  "$lt": 30,
  "$lte": 30,
  "$regex": 25,
  "$or": 25
};

function detectOperators(value, fieldPath, schema, issues) {
  if (value === null || typeof value !== "object") return;

  // array hole prottek element check korte hobe, karon
  // attacker array er vitore o operator gujhe dite pare
  if (Array.isArray(value)) {
    value.forEach((item, i) => detectOperators(item, `${fieldPath}[${i}]`, schema, issues));
    return;
  }

  for (const key in value) {
    if (key.startsWith("$")) {
      const points = OPERATOR_RULES[key] !== undefined ? OPERATOR_RULES[key] : 20;

      issues.push({
        field: fieldPath,
        reason: "dangerous_operator",
        operator: key,
        points
      });
    }

    detectOperators(value[key], fieldPath, schema, issues);
  }
}

function runOperatorDetection(data, schema) {
  const issues = [];

  for (const field in data) {
    detectOperators(data[field], field, schema, issues);
  }

  return issues;
}

module.exports = runOperatorDetection;