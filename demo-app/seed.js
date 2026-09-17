require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected for seeding");

    // Clear existing users first
    await User.deleteMany({});
    console.log("🗑️  Old users cleared");

    // Insert dummy users
    const users = [
      { username: "admin", password: "SuperSecret123!" },
      { username: "snahat", password: "MyRealPassword456" },
      { username: "testuser", password: "test1234" }
    ];

    await User.insertMany(users);
    console.log("✅ Dummy users seeded successfully:");
    users.forEach(u => console.log(`   - username: ${u.username}, password: ${u.password}`));

    await mongoose.disconnect();
    console.log("✅ Done. Disconnected from MongoDB.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
};

seedUsers();