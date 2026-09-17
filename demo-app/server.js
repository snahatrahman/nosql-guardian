require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connect");

const app = express();
app.use(express.json());

connectDB();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("NoSQL Guardian demo app is running");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});