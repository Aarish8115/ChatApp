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
    res.json({
      error: false,
      friends: user.friends,
    });
  } else res.status(400).json({ error: true, message: "No friends found" });
}

async function addFriend(req, res) {
  const { username } = req.user;
  const { friendId } = req.body;

  const user = await User.findOne({ username });
  const friend = await User.findOne({ userId: friendId });

  if (!user || !friend) {
    return res.status(400).json({ error: true, message: "User not found" });
  }

  if (user.friends.includes(friendId)) {
    return res.status(400).json({ error: true, message: "Already friends" });
  }

  user.friends.push(friendId);
  friend.friends.push(user.userId);
  await user.save();
  await friend.save();

  res.json({ error: false, message: "Friend added successfully" });
}

async function getUser(req, res) {
  const { userId } = req.params;

  const userdet = await User.findOne({ userId });

  if (userdet) {
    res.json({
      error: false,
      user: {
        userId: userdet.userId,
        username: userdet.username,
        bio: userdet.bio,
      },
    });
  } else {
    res.status(404).json({ error: true, message: "User not found" });
  }
}
async function getActiveUser(req, res) {
  const { username } = req.user;

  const user = await User.findOne({ username });

  if (user) {
    res.json({
      error: false,
      user: {
        userId: user.userId,
        username: user.username,
      },
    });
  } else {
    res.status(404).json({ error: true, message: "User not found" });
  }
}
async function searchUser(req, res) {
  const { username } = req.user;
  const { query } = req.body;
  const users = await User.find({
    username: { $ne: username },
    userId: { $regex: query },
  }).limit(3);

  const simplifiedUsers = users.map((user) => ({
    userId: user.userId,
    username: user.username,
  }));

  res.json({
    error: false,
    users: simplifiedUsers,
  });
}
async function updateUser(req, res) {
  const { username } = req.user;
  const { newUsername, newBio } = req.body;
  const updatedUser = await User.findOneAndUpdate(
    { username },
    { username: newUsername, bio: newBio }
  );
  await updatedUser.save();
  console.log(updatedUser);
  if (updatedUser) {
    return res.json({
      error: false,
      user: {
        userId: updatedUser.userId,
        username: updatedUser.username,
      },
    });
  }
}

module.exports = {
  checkUser,
  friendsList,
  addFriend,
  getUser,
  getActiveUser,
  searchUser,
  updateUser,
};
