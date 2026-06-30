const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI
    );

    console.log(
      "MongoDB Connected Successfully"
    );

    // Seed default admin if no admin exists
    const adminCount = await User.countDocuments({ role: "admin" });
    if (adminCount === 0) {
      const existingUser = await User.findOne({ email: "admin@eventhub.com" });
      const hashedPassword = await bcrypt.hash("admin123", 10);
      if (existingUser) {
        existingUser.role = "admin";
        existingUser.password = hashedPassword;
        await existingUser.save();
        console.log("Updated existing user admin@eventhub.com to admin role.");
      } else {
        await User.create({
          name: "System Admin",
          email: "admin@eventhub.com",
          password: hashedPassword,
          role: "admin",
        });
        console.log("Default admin created successfully: admin@eventhub.com / admin123");
      }
    }

  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

module.exports = connectDB;