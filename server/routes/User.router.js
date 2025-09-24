const { Router } = require("express");
const { checkUser } = require("../controllers/userController");
const { authenticateToken } = require("../middlewares/Auth");
const { addFriend,getUser } = require("../controllers/userController");
const app = Router();

app.route("/check-user").get(authenticateToken, checkUser);
app.post("/add-friend", authenticateToken, addFriend);
app.get("/user/:userId", authenticateToken, getUser );
module.exports = app;
