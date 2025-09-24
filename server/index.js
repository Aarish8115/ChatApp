const express = require("express");
// Load environment variables first
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const config = require("./config/config.json");

// Verify required environment variables
if (!process.env.ACCESS_TOKEN) {
  console.error("ERROR: Missing ACCESS_TOKEN environment variable");
  console.error("Please set it in your .env file");
  process.exit(1);
}

// Connect to MongoDB with error handling
mongoose
  .connect(config.connectionString)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

const cors = require("cors");
app.use(cors({ origin: "*" }));

// Request body parser middleware
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
