const express = require('express');
const router = express.Router();
const streamController = require('../controllers/streamController');

router.get('/status', streamController.getStatus);
router.get('/info', streamController.getInfo);

module.exports = router;