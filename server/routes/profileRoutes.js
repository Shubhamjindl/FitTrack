const express = require('express');
const router = express.Router();
const { getProfileStats } = require('../controllers/profileController');
const { protect } = require('../middleware/auth');

router.use(protect);
router.get('/', getProfileStats);

module.exports = router;
