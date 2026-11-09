const OBJECT_CLASSES = [
  'person', 'car', 'bicycle', 'chair', 'door', 'stairs',
  'table', 'bottle', 'bag', 'dog', 'cat', 'tree',
  'signboard', 'traffic light', 'fire hydrant', 'bench',
  'motorcycle', 'truck', 'bus', 'traffic cone',
];

const PROXIMITIES = ['near', 'medium', 'far'];

export const mockDetectObjects = () => {
  const count = Math.floor(Math.random() * 4) + 1;
  const detections = [];

  for (let i = 0; i < count; i++) {
    const label = OBJECT_CLASSES[Math.floor(Math.random() * OBJECT_CLASSES.length)];
    const confidence = (0.65 + Math.random() * 0.33).toFixed(2);
    const proximity = PROXIMITIES[Math.floor(Math.random() * PROXIMITIES.length)];
    const isCritical = proximity === 'near' && ['person', 'car', 'stairs', 'motorcycle', 'truck'].includes(label);

    detections.push({ label, confidence: parseFloat(confidence), proximity, isCritical });
  }

  return detections;
};

const MOCK_TEXTS = [
  'Exit', 'Room 204', 'Emergency Exit', 'No Entry', 'Wet Floor',
  'Stairs Ahead', 'Push', 'Pull', 'Caution: Step', 'Restricted Area',
  'Fire Exit', 'Level 3', 'Information Desk', 'Restrooms',
];

export const mockOcrRead = () => {
  const hasText = Math.random() > 0.4;
  if (!hasText) return null;
  return MOCK_TEXTS[Math.floor(Math.random() * MOCK_TEXTS.length)];
};

export const mockSafetyAnalysis = (detections) => {
  const critical = detections.filter(d => d.isCritical);
  if (critical.length > 0) {
    return { level: 'danger', message: `Critical obstacle: ${critical[0].label} very close!` };
  }
  const near = detections.filter(d => d.proximity === 'near');
  if (near.length > 0) {
    return { level: 'warning', message: `Obstacle nearby: ${near[0].label}` };
  }
  return { level: 'safe', message: 'Path is clear' };
};
