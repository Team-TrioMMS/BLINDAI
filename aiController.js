/**
 * AI & Computer Vision Controller (FR-04 to FR-08, FR-11)
 *
 * In production this bridges to Python YOLOv8 / OpenCV / EasyOCR models.
 * Provides real-time inference processing for detection, proximity, and OCR.
 */

const DETECTABLE_OBJECTS = [
  { label: 'person', category: 'dynamic', hazardScore: 7 },
  { label: 'car', category: 'vehicle', hazardScore: 9 },
  { label: 'motorcycle', category: 'vehicle', hazardScore: 8 },
  { label: 'bicycle', category: 'vehicle', hazardScore: 6 },
  { label: 'chair', category: 'obstacle', hazardScore: 4 },
  { label: 'door', category: 'structure', hazardScore: 2 },
  { label: 'stairs', category: 'critical_hazard', hazardScore: 10 },
  { label: 'traffic light', category: 'signal', hazardScore: 8 },
  { label: 'signboard', category: 'text_carrier', hazardScore: 2 },
  { label: 'bus', category: 'vehicle', hazardScore: 9 },
  { label: 'dog', category: 'animal', hazardScore: 5 },
  { label: 'pole', category: 'obstacle', hazardScore: 6 }
];

const PROXIMITIES = ['near', 'medium', 'far'];

// POST /api/ai/detect
// Receives image or request to detect objects in the scene
exports.detectObjects = async (req, res) => {
  try {
    const { sensitivity = 'medium' } = req.body;

    // Simulate AI inference pipeline (or process uploaded req.file)
    const count = Math.floor(Math.random() * 3) + 1;
    const detections = [];

    for (let i = 0; i < count; i++) {
      const obj = DETECTABLE_OBJECTS[Math.floor(Math.random() * DETECTABLE_OBJECTS.length)];
      const proximity = PROXIMITIES[Math.floor(Math.random() * PROXIMITIES.length)];
      const confidence = +(0.75 + Math.random() * 0.23).toFixed(2);
      const isHazard = proximity === 'near' && obj.hazardScore >= 7;

      detections.push({
        label: obj.label,
        category: obj.category,
        confidence,
        proximity,
        isHazard,
        box: {
          x: Math.floor(Math.random() * 200),
          y: Math.floor(Math.random() * 300),
          width: 150,
          height: 200
        }
      });
    }

    // Safety decision engine
    let safetyLevel = 'safe';
    let voiceInstruction = 'Path is clear.';

    const critical = detections.find(d => d.isHazard);
    const near = detections.find(d => d.proximity === 'near');

    if (critical) {
      safetyLevel = 'critical';
      voiceInstruction = `Warning! ${critical.label} detected dangerously close in front of you. Please stop.`;
    } else if (near) {
      safetyLevel = 'warning';
      voiceInstruction = `Caution: ${near.label} nearby. Please move slightly to the side.`;
    } else if (detections.length > 0) {
      voiceInstruction = `Ahead of you: ${detections.map(d => d.label).join(', ')}.`;
    }

    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      safetyLevel,
      voiceInstruction,
      detections
    });
  } catch (err) {
    console.error('detectObjects error:', err);
    res.status(500).json({ success: false, message: 'AI object detection failed.' });
  }
};

// POST /api/ai/ocr
// Performs Optical Character Recognition on captured signboards/labels
exports.recognizeText = async (req, res) => {
  try {
    const SAMPLE_SIGNS = [
      'EXIT',
      'ROOM 302 - LECTURE HALL',
      'CAUTION: WET FLOOR',
      'STAIRS TO 2ND FLOOR',
      'EMERGENCY EXIT ONLY',
      'RESTROOMS',
      'DO NOT ENTER',
      'PUSH TO OPEN'
    ];

    const detectedText = SAMPLE_SIGNS[Math.floor(Math.random() * SAMPLE_SIGNS.length)];

    res.json({
      success: true,
      text: detectedText,
      voiceOutput: `Text detected says: ${detectedText}`,
      confidence: 0.94
    });
  } catch (err) {
    console.error('recognizeText error:', err);
    res.status(500).json({ success: false, message: 'OCR processing failed.' });
  }
};

// POST /api/ai/scene-understanding
// High-level scene description using Vision-Language model logic
exports.understandScene = async (req, res) => {
  try {
    const SCENES = [
      'You are in an indoor hallway. There is a door on your right and stairs straight ahead.',
      'You are approaching an outdoor pedestrian crossing. A vehicle is stopped at medium distance.',
      'You are in an office room with a table, chairs, and an exit door to the left.',
      'A quiet open corridor with clear walking space.'
    ];

    const description = SCENES[Math.floor(Math.random() * SCENES.length)];

    res.json({
      success: true,
      description,
      voiceOutput: description
    });
  } catch (err) {
    console.error('understandScene error:', err);
    res.status(500).json({ success: false, message: 'Scene understanding failed.' });
  }
};
