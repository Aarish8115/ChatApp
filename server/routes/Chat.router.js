const { Router } = require('express');
const { sendMessage, getMessages } = require('../controllers/chatController');
const { authenticateToken } = require('../middlewares/Auth');
const { friendsList } = require('../controllers/userController');

const router = Router();
router.post('/messages', authenticateToken, sendMessage);
router.get('/messages/:userId', authenticateToken, getMessages);
router.get('/friends', authenticateToken, friendsList);

module.exports = router;
