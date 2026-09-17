const express = require("express");
const router = express.Router();
const User = require("../models/User");
const nosqlGuardian = require("../../middleware/nosqlGuardian");
const { loginSchema } = require("../../config/schemas");

router.post("/login", nosqlGuardian(loginSchema), async (req, res) => {
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