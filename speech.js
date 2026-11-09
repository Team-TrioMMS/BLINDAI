import * as Speech from 'expo-speech';
import * as Haptics from 'expo-haptics';

/**
 * Speak text aloud using the device TTS engine.
 * @param {string} text - Text to speak
 * @param {object} options - Speech options (rate, pitch, language)
 */
export const speak = (text, options = {}) => {
  Speech.stop(); // Stop any current speech
  Speech.speak(text, {
    rate: options.rate || 1.0,
    pitch: options.pitch || 1.0,
    language: options.language || 'en-US',
    ...options,
  });
};

export const stopSpeaking = () => {
  Speech.stop();
};

export const warningVibration = () => {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
};

export const dangerVibration = () => {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
};

export const successHaptic = () => {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
};

/**
 * Classify proximity based on mock bounding box size
 * In a real app, this would use depth estimation from AI.
 * @param {number} areaRatio - Object's bounding box area / screen area (0-1)
 * @returns {'near' | 'medium' | 'far'}
 */
export const estimateProximity = (areaRatio) => {
  if (areaRatio > 0.3) return 'near';
  if (areaRatio > 0.1) return 'medium';
  return 'far';
};

/**
 * Generate a voice message for detected objects
 * @param {Array} detections - [{label, confidence, proximity}]
 * @returns {string} - Human readable description
 */
export const generateSceneDescription = (detections) => {
  if (!detections || detections.length === 0) {
    return 'No objects detected nearby. Path appears clear.';
  }

  const nearObjects = detections.filter(d => d.proximity === 'near');
  const criticalObjects = nearObjects.filter(d =>
    ['person', 'car', 'truck', 'bicycle', 'motorcycle', 'stairs', 'hole'].includes(d.label)
  );

  if (criticalObjects.length > 0) {
    const labels = criticalObjects.map(d => d.label).join(' and ');
    return `Warning! ${labels} detected very close. Please stop and proceed with caution.`;
  }

  if (nearObjects.length > 0) {
    const labels = nearObjects.map(d => d.label).join(', ');
    return `Obstacle detected nearby: ${labels}. Please be careful.`;
  }

  const allLabels = detections.map(d => `${d.label} (${d.proximity})`).join(', ');
  return `Scene description: ${allLabels}. Path appears safe.`;
};
