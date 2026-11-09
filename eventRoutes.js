const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/', eventController.createEvent);
router.get('/', eventController.getEvents);
router.delete('/', eventController.clearEvents);

module.exports = router;
