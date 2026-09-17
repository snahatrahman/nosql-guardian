const validateTypes = require("./validators/typeValidator");
const runOperatorDetection = require("./validators/operatorDetector");
const logBlockedRequest = require("./logger");

const RISK_THRESHOLD = 10;

function nosqlGuardian(schema) {
  return function (req, res, next) {
    const data = req.body || {};

    const typeIssues = validateTypes(data, schema);
    const operatorIssues = runOperatorDetection(data, schema);

    const allIssues = [...typeIssues, ...operatorIssues];
    const riskScore = allIssues.reduce((sum, issue) => sum + issue.points, 0);

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

    next();
  };
}

module.exports = nosqlGuardian;