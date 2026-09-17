const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const nosqlGuardian = require("../../middleware/nosqlGuardian");
const { productSearchSchema } = require("../../config/schemas");

router.post("/search", nosqlGuardian(productSearchSchema), async (req, res) => {
  const { productName, category } = req.body;

  try {
    const query = {};
    if (productName) query.productName = productName;
    if (category) query.category = category;

    const products = await Product.find(query);

    return res.status(200).json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
});

module.exports = router;