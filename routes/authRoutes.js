const express =
  require("express");

const bcrypt =
  require("bcryptjs");

const jwt =
  require("jsonwebtoken");

const User =
  require("../models/User");

const router =
  express.Router();

router.post(
  "/register",
  async (req, res) => {
    const {
      name,
      email,
      password,
    } = req.body;

    const existingUser =
      await User.findOne({
        email,
      });

    if (existingUser) {
      return res
        .status(400)
        .json({
          message:
            "User already exists",
        });
    }

    const hashed =
      await bcrypt.hash(
        password,
        10
      );

    const user =
      await User.create({
        name,
        email,
        password: hashed,
      });

    res.json(user);
  }
);

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.post(
  "/login",
  async (req, res) => {
    const {
      email,
      password,
    } = req.body;

    const user =
      await User.findOne({
        email,
      });

    if (!user) {
      return res
        .status(400)
        .json({
          message:
            "User not found",
        });
    }

    const match =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!match) {
      return res
        .status(400)
        .json({
          message:
            "Wrong Password",
        });
    }

    const token =
      jwt.sign(
        {
          id: user._id,
          role: user.role || "user",
        },
        process.env.JWT_SECRET
      );

    res.json({
      token,
      user,
    });
  }
);

router.post(
  "/create-admin",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({
          message: "All fields are required",
        });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          message: "User already exists with this email",
        });
      }

      const hashed = await bcrypt.hash(password, 10);
      const newAdmin = await User.create({
        name,
        email,
        password: hashed,
        role: "admin",
      });

      res.status(201).json({
        message: "Admin created successfully",
        user: {
          id: newAdmin._id,
          name: newAdmin.name,
          email: newAdmin.email,
          role: newAdmin.role,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Error creating admin",
      });
    }
  }
);

module.exports = router;