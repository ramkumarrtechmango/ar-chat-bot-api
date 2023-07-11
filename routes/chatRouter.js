const express = require('express');
const chatController = require('../controller/chatController');

const router = express.Router();

router.post('/chatWithMe', chatController.chatWithMe);
router.post('/createHook', chatController.createHook);

module.exports = router;