const express = require('express');
const router = express.Router();
const multer = require('multer');
const aiController = require('../controllers/aiController');
const { authMiddleware } = require('../middleware/authMiddleware');

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

// AI routes (can be accessed with or without auth token for maximum accessibility)
router.post('/detect', upload.single('frame'), aiController.detectObjects);
router.post('/ocr', upload.single('image'), aiController.recognizeText);
router.post('/scene-understanding', upload.single('image'), aiController.understandScene);

module.exports = router;
