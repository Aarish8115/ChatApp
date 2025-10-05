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
    origin: [
      "https://chatapp-frontend-l2g9.onrender.com",
      "http://localhost:5173",
      "https://chatapp-backend-e8b7.onrender.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  },
});

require("./utils/socketManager").init(io);

if (!process.env.ACCESS_TOKEN) {
  console.error("ERROR: Missing ACCESS_TOKEN environment variable");
  console.error("Please set it in your .env file");
  process.exit(1);
}
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

const cors = require("cors");

// CORS configuration middleware
app.use(
  cors({
    origin: [
      "https://chatapp-frontend-l2g9.onrender.com",
      "http://localhost:5173",
      "https://chatapp-backend-e8b7.onrender.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Pre-flight requests handling
app.options("*", cors());

// Add security headers middleware
app.use((req, res, next) => {
  // Instead of using res.header, use res.setHeader for Express 5 compatibility
  const allowedOrigins = [
    "https://chatapp-frontend-l2g9.onrender.com",
    "http://localhost:5173",
    "https://chatapp-backend-e8b7.onrender.com",
  ];

  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    // For requests without origin header or from unknown origins
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  }

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(express.json());

// Import routes
const authRouter = require("./routes/Auth.router");
const userRouter = require("./routes/User.router");
const chatRouter = require("./routes/Chat.router");

// Apply routes
app.use(authRouter);
app.use(userRouter);
app.use(chatRouter);
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
