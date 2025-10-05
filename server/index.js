const express = require("express");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");

// Verify required environment variables
if (!process.env.ACCESS_TOKEN) {
  console.error("ERROR: Missing ACCESS_TOKEN environment variable");
  console.error("Please set it in your .env file");
  process.exit(1);
}

// Connect to MongoDB with error handling
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

const cors = require("cors");

// Configure CORS with explicit settings and handle preflight
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://chatapp-frontend-l2g9.onrender.com",
  ], // Allow both local dev and deployed frontend
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  // Do not hardcode allowedHeaders so preflight can echo request headers
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Request body parser middleware
app.use(express.json());

const auth = require("./routes/Auth.router");
const checkUser = require("./routes/User.router");
const chat = require("./routes/Chat.router");

app.use(auth);
app.use(checkUser);
app.use(chat);
app.get("/", (req, res) => {
  res.send("Chat App API is running!");
});

// Health check endpoint that doesn't require auth
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    timestamp: new Date().toISOString(),
    message: "Server is running properly",
  });
});

app.listen(port, () => {
  console.log(`Chat App server running on port ${port}`);
  console.log(
    `CORS enabled for origins: http://localhost:5173, https://chatapp-frontend-l2g9.onrender.com`
  );
});
