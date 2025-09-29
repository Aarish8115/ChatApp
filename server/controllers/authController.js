const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { generateId } = require("../utils/generateId");
const bcrypt = require("bcrypt");
async function register(req, res) {
  const { username, email, password } = req.body;
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

  const isUser = await User.findOne({ email: email });
  if (isUser) {
    return res
      .status(400)
      .json({ error: true, message: "User already exists" });
  }
  const isUsername = await User.findOne({ username: username });
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
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ error: true, message: "email is required" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }
  const user = await User.findOne({ email });

  if (email == user.email) {
    bcrypt.compare(password, user.password, function (err, result) {
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
  } else
    return res.status(400).json({ error: true, message: "Wrong password" });
}
module.exports = { register, login };
