const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { generateId } = require("../utils/generateId");
const bcrypt = require("bcrypt");
async function register(req, res) {
  let { username, email, password } = req.body || {};
  // Normalize inputs
  username = typeof username === "string" ? username.trim().toLowerCase() : "";
  email = typeof email === "string" ? email.trim().toLowerCase() : "";
  password = typeof password === "string" ? password : "";

  if (!username) {
    return res
      .status(400)
      .json({ error: true, message: "Username is required" });
  }
  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }

  const isUser = await User.findOne({ email });
  if (isUser) {
    return res
      .status(400)
      .json({ error: true, message: "User already exists" });
  }
  const isUsername = await User.findOne({ username });
  if (isUsername) {
    return res
      .status(400)
      .json({ error: true, message: "Username already exists" });
  }

  const userId = await generateId();
  bcrypt.hash(password, 10, async function (err, hash) {
    if (err) {
      return res.json({ error: true, message: "Some error occured." });
    }
    const user = new User({ username, email, password: hash, userId });
    await user.save();
    const accessToken = jwt.sign(
      { _id: user._id, email: user.email, username: user.username },
      process.env.ACCESS_TOKEN,
      { expiresIn: "360000m" }
    );

    return res.json({
      error: false,
      user,
      accessToken,
      message: "Registeration Successfull.",
    });
  });
}
async function login(req, res) {
  let { email, password } = req.body || {};
  // Normalize inputs
  email = typeof email === "string" ? email.trim().toLowerCase() : "";
  password = typeof password === "string" ? password : "";

  if (!email) {
    return res.status(400).json({ error: true, message: "email is required" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }
  const user = await User.findOne({ email });

  // Check if user exists
  if (!user) {
    return res.status(400).json({ error: true, message: "User not found" });
  }

  // Compare passwords
  bcrypt.compare(password, user.password, function (err, result) {
    if (err) {
      return res
        .status(500)
        .json({ error: true, message: "Internal server error" });
    }
    if (result) {
      const accessToken = jwt.sign(
        { _id: user._id, email: user.email, username: user.username },
        process.env.ACCESS_TOKEN,
        { expiresIn: "2d" }
      );
      return res.json({
        error: false,
        user,
        accessToken,
        message: "Login successful",
      });
    } else return res.status(400).json({ error: true, message: "Wrong password" });
  });
}
module.exports = { register, login };
