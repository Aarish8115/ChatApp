const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const config = require("./config/config.json");
require("dotenv").config();

mongoose.connect(config.connectionString);
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
