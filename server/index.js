const express = require("express");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

const mongoose = require("mongoose");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");

// Validate env
if (!process.env.ACCESS_TOKEN) {
  console.error("ERROR: Missing ACCESS_TOKEN environment variable");
  console.error("Please set it in your .env file");
  process.exit(1);
}

// Connect DB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// CORS configuration for both REST and Socket.IO
const allowedOrigins = [
  "https://chatapp-frontend-l2g9.onrender.com",
  "http://localhost:5173",
];

const corsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
  ],
  optionsSuccessStatus: 204,
};

// CORS must be applied before any routes
app.use(cors(corsOptions));

// Explicitly handle preflight for all routes (cors will attach headers)
app.options("*", cors(corsOptions));

// Body parser
app.use(express.json());

// Routes
const auth = require("./routes/Auth.router");
const checkUser = require("./routes/User.router");
const chat = require("./routes/Chat.router");

app.use(auth);
app.use(checkUser);
app.use(chat);

app.get("/", (req, res) => {
  res.send("Chat App API is running!");
});

// Socket.IO with same CORS
const io = new Server(server, { cors: corsOptions });

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

// Initialize any socket managers after io is ready
require("./utils/socketManager").init(io);

// Start server
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
