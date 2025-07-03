const express = require('express');
const router = express.Router();
const podcastController = require('../controllers/podcastController');

router.get('/', podcastController.getPlayer);

module.exports = router;