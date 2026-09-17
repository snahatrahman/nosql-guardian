const fs = require("fs");
const path = require("path");

const logPath = path.join(__dirname, "..", "logs", "blocked-requests.log");

function logBlockedRequest(details) {
  const entry = {
    timestamp: new Date().toISOString(),
    ...details
  };

  fs.appendFile(logPath, JSON.stringify(entry) + "\n", (err) => {
    if (err) console.error("Failed to write log:", err.message);
  });
}

module.exports = logBlockedRequest;