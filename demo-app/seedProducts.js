require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected for seeding products");

    await Product.deleteMany({});
    console.log("🗑️  Old products cleared");

    const products = [
      { productName: "Tomato", category: "Vegetable", price: 40 },
      { productName: "Mango", category: "Fruit", price: 120 },
      { productName: "Rice", category: "Grain", price: 65 }
    ];

    await Product.insertMany(products);
    console.log("✅ Dummy products seeded successfully:");
    products.forEach(p => console.log(`   - ${p.productName} (${p.category}) - ${p.price} BDT`));

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
};

seedProducts();