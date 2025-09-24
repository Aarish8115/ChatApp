const { Router } = require("express");
const { register, login } = require("../controllers/authController");

const app = Router();

app.route("/register").post(register);
app.route("/login").post(login);

module.exports = app;
