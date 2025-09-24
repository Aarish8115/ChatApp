const User = require("../models/User");

async function checkUser(req, res) {
  const { username } = req.user;

  const user = await User.findOne({ username });

  if (user) {
    res.json({
      error: false,
      verified: true,
    });
  } else res.status(400).json({ error: true, message: "User not verified" });
}

async function friendsList(req, res) {
  const { username } = req.user;
  const user = await User.findOne({ username });

  if (user) {
    console.log(user);
    res.json({
      error: false,
      friends: user.friends,
    });
  } else res.status(400).json({ error: true, message: "No friends found" });
}

async function addFriend(req, res) {
  const { userId } = req.user;
  const { friendId } = req.body;

  const user = await User.findOne({ userId });
  const friend = await User.findOne({ userId: friendId });

  if (!user || !friend) {
    return res.status(400).json({ error: true, message: "User not found" });
  }

  user.friends.push(friendId);
  friend.friends.push(userId);
  await user.save();
  await friend.save();

  res.json({ error: false, message: "Friend added successfully" });
}
async function getUser(req, res) {
  const { userId } = req.params;
  
  const user = await User.findOne({ userId });

  if (user) {
    res.json({
      error: false,
      user,
    });
  } else {
    res.status(404).json({ error: true, message: "User not found" });
  }
}
module.exports = { checkUser, friendsList, addFriend,getUser };