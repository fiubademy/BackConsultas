const express = require("express");
const router = express.Router();
const chatsController = require("../controllers/chats-controller");

router.put("/update_token", chatsController.update_token);
router.post("/notify_user", chatsController.notify_user);

module.exports = router;
