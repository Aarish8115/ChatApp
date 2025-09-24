const User = require("../models/User");

async function generateId() {
  const min = 100000;
  const max = 999999;
  const uuid = Math.floor(Math.random() * (max - min + 1)) + min;
  const isuuid = await User.findOne({ userId: uuid.toString() });
  if (isuuid) {
    // Return the result of the recursive call
    return generateId();
  } else {
    // Return as string to ensure it's not treated as a number
    return uuid.toString();
  }
}

module.exports = { generateId };
