# NoSQL Guardian

A middleware-based filtering framework for detecting and preventing NoSQL Injection attacks in MongoDB applications, built with Node.js and Express.

## The Problem

MongoDB queries are written as JSON objects, and MongoDB has special operators like `$where`, `$ne`, `$gt`, and `$regex`. If a backend blindly inserts client input into a query without checking its type, an attacker can send an object (e.g. `{ "$ne": null }`) instead of a plain string, and bypass authentication entirely without knowing the real password. This is known as NoSQL Injection.

## The Solution

NoSQL Guardian is an Express middleware that sits between the route handler and the MongoDB driver. It runs every incoming request through:

1. **Type Validator** - checks each field against an expected type
2. **Operator Detector** - recursively scans for dangerous `$` operators
3. **Risk Scoring Engine** - assigns weighted points to each issue found
4. **Decision Engine** - rejects the request if the total score crosses a threshold (10), and logs the attempt

See `docs/architecture-diagram.png` for the full flow.

## Project Structure

- `middleware/` - the core NoSQL Guardian middleware
- `config/schemas.js` - per-route field schemas
- `demo-app/` - a demo Express + MongoDB login API used to test the middleware
- `attack-tests/` - a Postman collection with attack payloads
- `logs/` - blocked request logs (generated at runtime)

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB running locally on port 27017

### Steps

1. Clone the repo and install dependencies:
   \`\`\`
   npm install
   \`\`\`

2. Create a `.env` file in the root with:
   \`\`\`
   MONGO_URI=mongodb://127.0.0.1:27017/nosqlGuardianDemo
   PORT=5000
   \`\`\`

3. Seed the database with test users:
   \`\`\`
   node demo-app/seed.js
   \`\`\`

4. Start the server:
   \`\`\`
   node demo-app/server.js
   \`\`\`

5. Import `attack-tests/nosql-guardian.postman_collection.json` into Postman and run the requests to see normal login succeed and attack payloads get blocked.

## Risk Scoring Table

| Issue | Points |
|---|---|
| `$where` operator | 100 |
| Type mismatch (string expected, object received) | 40 |
| `$ne` / `$gt` / `$gte` / `$lt` / `$lte` | 30 |
| `$regex` / `$or` | 25 |
| Unknown operator starting with `$` | 20 |

Requests scoring 10 or above are rejected.

## Test Users (seeded)

| Username | Password |
|---|---|
| admin | SuperSecret123! |
| snahat | MyRealPassword456 |
| testuser | test1234 |