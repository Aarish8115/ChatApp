const Chat = require("../models/Chat");
const User = require("../models/User");
async function sendMessage(req, res) {
  try {
    const { username } = req.user;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "Sender user not found" });
    }

    const userId = user.userId;
    const { receiverId, message } = req.body;

    if (!receiverId) {
      return res.status(400).json({ message: "Receiver ID is required" });
    }

    const receiver = await User.findOne({ userId: receiverId });
    if (!receiver) {
      return res.status(404).json({ message: "Receiver user not found" });
    }

    const chatId = `${userId}-${receiverId}-${Date.now()}`;
    const chat = new Chat({
      chatId,
      senderId: userId,
      receiverId,
      message,
    });
    await chat.save();

    const socketManager = require("../utils/socketManager");
    const io = socketManager.getIO();
    io.emit("send_message", {
      senderId: userId,
      receiverId,
      message,
      chatId,
      timestamp: new Date(),
    });

    res.status(200).json({ message: "Message sent successfully", chat });
  } catch (error) {
    console.error("Error in sendMessage:", error);
    res
      .status(500)
      .json({ message: "Error sending message", error: error.message });
  }
}

async function getMessages(req, res) {
  try {
    const { username } = req.user;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userId = user.userId;
    const otherUserId = req.params.userId;

    if (!otherUserId) {
      return res.status(400).json({ message: "Other user ID is required" });
    }

    const messages = await Chat.find({
      $or: [
        { senderId: userId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: userId },
      ],
    }).sort({ timestamp: 1 }); // Sort by timestamp to get messages in chronological order

    res.status(200).json({ messages });
  } catch (error) {
    console.error("Error in getMessages:", error);
    res
      .status(500)
      .json({ message: "Error fetching messages", error: error.message });
  }
}

module.exports = { sendMessage, getMessages };
