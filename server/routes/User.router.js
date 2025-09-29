const { Router } = require("express");
const {
  checkUser,
  searchUser,
  updateUser,
} = require("../controllers/userController");
const { authenticateToken } = require("../middlewares/Auth");
const {
  addFriend,
  getUser,
  getActiveUser,
} = require("../controllers/userController");
const app = Router();

app.route("/check-user").get(authenticateToken, checkUser);
app.post("/add-friend", authenticateToken, addFriend);
app.get("/user/:userId", authenticateToken, getUser);
app.get("/me", authenticateToken, getActiveUser);
app.post("/users", authenticateToken, searchUser);
app.post("/update-user", authenticateToken, updateUser);
module.exports = app;
