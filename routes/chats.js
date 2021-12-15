const express = require('express');
const router = express.Router();
const chatsController = require('../controllers/chats-controller');

router.get('/get_open_chats',chatsController.get_open_chats);
router.get('/get_chat',chatsController.get_chat);
router.post('/add_msg',chatsController.add_msg);

module.exports = router;