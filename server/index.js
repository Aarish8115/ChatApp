const express = require("express");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const config = require("./config/config.json");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

require("./utils/socketManager").init(io);

if (!process.env.ACCESS_TOKEN) {
  console.error("ERROR: Missing ACCESS_TOKEN environment variable");
  console.error("Please set it in your .env file");
  process.exit(1);
}
mongoose
  .connect(config.connectionString)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

const cors = require("cors");
app.use(cors({ origin: "*" }));

app.use(express.json());

const auth = require("./routes/Auth.router");
const checkUser = require("./routes/User.router");
const chat = require("./routes/Chat.router");

app.use(auth);
app.use(checkUser);
app.use(chat);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const activeUsers = new Map();

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("user_connected", (userId) => {
    console.log(`User ${userId} registered with socket ${socket.id}`);
    activeUsers.set(userId, socket.id);
    io.emit("user_status_changed", Array.from(activeUsers.keys()));
  });

  socket.on("send_message", (data) => {
    const { senderId, receiverId, message, chatId } = data;
    console.log(`Message from ${senderId} to ${receiverId}: ${message}`);

    const receiverSocketId = activeUsers.get(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receive_message", {
        senderId,
        message,
        chatId,
        timestamp: new Date(),
      });
    }
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    for (const [userId, socketId] of activeUsers.entries()) {
      if (socketId === socket.id) {
        activeUsers.delete(userId);
        break;
      }
    }
    io.emit("user_status_changed", Array.from(activeUsers.keys()));
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
