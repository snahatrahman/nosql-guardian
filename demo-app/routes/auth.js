const express = require("express");
const router = express.Router();
const User = require("../models/User");

// ⚠️ VULNERABLE LOGIN ROUTE — no input type validation
// This route directly passes req.body values into the MongoDB query,
// which makes it exploitable via NoSQL injection (e.g. { "$ne": null } payloads)
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username, password: password });

    if (user) {
      return res.status(200).json({
        success: true,
        message: "Login successful",
        user: { username: user.username }
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password"
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
});

module.exports = router;