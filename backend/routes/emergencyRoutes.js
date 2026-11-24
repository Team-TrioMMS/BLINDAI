const express = require('express');
const router = express.Router();
const emergencyController = require('../controllers/emergencyController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/contacts', emergencyController.getContacts);
router.post('/contacts', emergencyController.addContact);
router.delete('/contacts/:id', emergencyController.deleteContact);
router.post('/alert', emergencyController.triggerAlert);

module.exports = router;
