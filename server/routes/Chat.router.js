const Router = require('express').Router();
const { sendMessage, getMessages } = require('../controllers/chatController');
const { authenticateToken } = require('../middlewares/Auth');
const {friendsList} = require('../controllers/userController');
Router.post('/messages', authenticateToken, sendMessage);
Router.get('/messages/:userId', authenticateToken, getMessages);
Router.get('/friends', authenticateToken, friendsList);

module.exports = Router;
