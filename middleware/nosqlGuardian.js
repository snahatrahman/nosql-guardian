const validateTypes = require("./validators/typeValidator");
const validateStructure = require("./validators/structureValidator");
const runOperatorDetection = require("./validators/operatorDetector");
const logBlockedRequest = require("./logger");

const RISK_THRESHOLD = 10;

function nosqlGuardian(schema) {
  return function (req, res, next) {
    const data = req.body || {};

    // 1. Validate data types
    const typeIssues = validateTypes(data, schema);

    // 2. Validate query structure / nesting
    const structureIssues = validateStructure(data, schema);

    // 3. Detect NoSQL operators
    const operatorIssues = runOperatorDetection(data, schema);

    // Combine all detected issues
    const allIssues = [
      ...typeIssues,
      ...structureIssues,
      ...operatorIssues
    ];

    // Calculate total risk score
    const riskScore = allIssues.reduce(
      (sum, issue) => sum + issue.points,
      0
    );

    // Block request if risk score reaches threshold
    if (riskScore >= RISK_THRESHOLD) {
      logBlockedRequest({
        path: req.originalUrl,
        method: req.method,
        ip: req.ip,
        riskScore,
        issues: allIssues
      });

      return res.status(403).json({
        success: false,
        message: "Request blocked by NoSQL Guardian",
        riskScore
      });
    }

    // Request is safe
    next();
  };
}

module.exports = nosqlGuardian;