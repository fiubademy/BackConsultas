const express = require('express');
const router = express.Router();
const chatsController = require('../controllers/chats-controller');

router.get('/register_token', chatsController.register_token);
router.get('/delete_token', chatsController.delete_token);
router.post('/sent_msg', chatsController.send_msg);

module.exports = router;