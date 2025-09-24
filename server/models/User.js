const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  avatarUrl: {
    type: String,
    default: "",
  },
  friends: [
    { type: String, ref: "User" }, 
  ],
  settings: {
    theme: { type: String, default: "light" },
    notifications: { type: Boolean, default: true },
    status: { type: String, default: "available" },
  },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
