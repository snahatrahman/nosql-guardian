require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connect");
const authRoutes = require("./routes/auth");

const app = express();
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("NoSQL Guardian demo app is running");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});