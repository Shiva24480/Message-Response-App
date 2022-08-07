const express = require('express');
const { fetchMessages, sendMessage } = require('../controllers/messageControllers');

const router = express.Router();

router.route('/').post(sendMessage);
router.route('/').get(fetchMessages);

module.exports = router;