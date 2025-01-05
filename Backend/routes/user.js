const express = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../db");
const JWT_SECRET = require("../config");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password, firstName, lastName } = req.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = new User({ username, password, firstName, lastName });
  await user.save();

  res.status(201).json({ message: "User registered successfully" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username, password });
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET);
  res.json({ token });
});

module.exports = router;
