import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Dimensions,
  Alert, Animated, Platform,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { speak, stopSpeaking, warningVibration, dangerVibration } from '../utils/speech';
import { mockDetectObjects, mockOcrRead, mockSafetyAnalysis } from '../utils/mockDetection';

const { width: W, height: H } = Dimensions.get('window');

const COLORS = {
  primary: '#1a1a2e',
  accent: '#e94560',
  secondary: '#16213e',
  card: '#0f3460',
  text: '#ffffff',
  muted: '#a0a0b0',
  success: '#4caf50',
  warning: '#ff9800',
  danger: '#f44336',
};

const PROXIMITY_COLOR = { near: COLORS.danger, medium: COLORS.warning, far: COLORS.success };

export default function CameraScreen() {
  const { settings, addEvent } = useApp();
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState('back');
  const [isDetecting, setIsDetecting] = useState(false);
  const [detections, setDetections] = useState([]);
  const [safetyStatus, setSafetyStatus] = useState({ level: 'safe', message: 'Tap to start detection' });
  const [ocrText, setOcrText] = useState(null);
  const [mode, setMode] = useState('detect'); // 'detect' | 'ocr'

  const intervalRef = useRef(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Pulse animation for detecting state
  useEffect(() => {
    if (isDetecting) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.1, duration: 600, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isDetecting]);

  const runDetection = useCallback(() => {
    if (mode === 'detect') {
      const results = mockDetectObjects();
      const safety = mockSafetyAnalysis(results);
      setDetections(results);
      setSafetyStatus(safety);

      if (safety.level === 'danger') {
        dangerVibration();
        if (settings.voiceEnabled) speak(safety.message, { rate: settings.speechRate, pitch: settings.speechPitch });
        addEvent({ type: 'danger', message: safety.message, detections: results });
      } else if (safety.level === 'warning') {
        warningVibration();
        if (settings.voiceEnabled) speak(safety.message, { rate: settings.speechRate });
      }
    } else {
      const text = mockOcrRead();
      setOcrText(text);
      if (text && settings.voiceEnabled) {
        speak(`Text detected: ${text}`, { rate: settings.speechRate });
        addEvent({ type: 'ocr', message: text });
      } else if (!text) {
        setOcrText('No text detected');
      }
    }
  }, [mode, settings, addEvent]);

  const toggleDetection = () => {
    if (isDetecting) {
      clearInterval(intervalRef.current);
      setIsDetecting(false);
      stopSpeaking();
      setDetections([]);
      setSafetyStatus({ level: 'safe', message: 'Detection stopped' });
      speak('Detection stopped.');
    } else {
      setIsDetecting(true);
      speak(mode === 'detect' ? 'Starting object detection.' : 'Starting text recognition.');
      runDetection();
      intervalRef.current = setInterval(runDetection, 3000);
    }
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (isDetecting) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(runDetection, 3000);
    }
  }, [mode, isDetecting, runDetection]);

  if (!permission) return <View style={styles.container} />;

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Ionicons name="camera-off" size={64} color={COLORS.muted} />
        <Text style={styles.permText}>Camera permission is required</Text>
        <TouchableOpacity style={styles.permBtn} onPress={requestPermission}>
          <Text style={styles.permBtnText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const safetyBgColor = safetyStatus.level === 'danger' ? COLORS.danger
    : safetyStatus.level === 'warning' ? COLORS.warning : COLORS.success;

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        {/* Top HUD */}
        <View style={styles.topHud}>
          <View style={[styles.safetyBadge, { backgroundColor: safetyBgColor }]}>
            <Ionicons
              name={safetyStatus.level === 'danger' ? 'warning' : safetyStatus.level === 'warning' ? 'alert-circle' : 'checkmark-circle'}
              size={18} color={COLORS.text}
            />
            <Text style={styles.safetyText}>{safetyStatus.message}</Text>
          </View>
        </View>

        {/* Detection overlays */}
        {mode === 'detect' && detections.map((d, i) => (
          <View
            key={i}
            style={[
              styles.detectionBox,
              {
                borderColor: PROXIMITY_COLOR[d.proximity],
                top: 100 + i * 80,
                left: 20 + (i % 2) * (W / 2 - 60),
                width: W / 2 - 60,
              },
            ]}
          >
            <Text style={[styles.detectionLabel, { backgroundColor: PROXIMITY_COLOR[d.proximity] }]}>
              {d.label} • {d.proximity} • {Math.round(d.confidence * 100)}%
            </Text>
          </View>
        ))}

        {/* OCR Result */}
        {mode === 'ocr' && ocrText && (
          <View style={styles.ocrBubble}>
            <Ionicons name="text" size={20} color={COLORS.text} />
            <Text style={styles.ocrText}>{ocrText}</Text>
          </View>
        )}

        {/* Bottom Controls */}
        <View style={styles.bottomControls}>
          {/* Mode Toggle */}
          <View style={styles.modeRow}>
            <TouchableOpacity
              style={[styles.modeBtn, mode === 'detect' && styles.modeBtnActive]}
              onPress={() => { setMode('detect'); setDetections([]); }}
            >
              <Ionicons name="scan" size={18} color={COLORS.text} />
              <Text style={styles.modeBtnText}>Detect</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modeBtn, mode === 'ocr' && styles.modeBtnActive]}
              onPress={() => { setMode('ocr'); setOcrText(null); }}
            >
              <Ionicons name="text" size={18} color={COLORS.text} />
              <Text style={styles.modeBtnText}>Read Text</Text>
            </TouchableOpacity>
          </View>

          {/* Main Controls Row */}
          <View style={styles.controlRow}>
            {/* Flip Camera */}
            <TouchableOpacity
              style={styles.sideBtn}
              onPress={() => setFacing(f => f === 'back' ? 'front' : 'back')}
              accessibilityLabel="Flip camera"
            >
              <Ionicons name="camera-reverse" size={28} color={COLORS.text} />
            </TouchableOpacity>

            {/* Main Detection Button */}
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <TouchableOpacity
                style={[styles.mainBtn, isDetecting && styles.mainBtnActive]}
                onPress={toggleDetection}
                accessibilityLabel={isDetecting ? 'Stop detection' : 'Start detection'}
              >
                <Ionicons
                  name={isDetecting ? 'stop-circle' : 'eye'}
                  size={36}
                  color={COLORS.text}
                />
                <Text style={styles.mainBtnText}>{isDetecting ? 'Stop' : 'Scan'}</Text>
              </TouchableOpacity>
            </Animated.View>

            {/* Voice Describe */}
            <TouchableOpacity
              style={styles.sideBtn}
              onPress={() => {
                if (detections.length > 0) {
                  const desc = detections.map(d => `${d.label} ${d.proximity}`).join(', ');
                  speak(`Detected: ${desc}`);
                } else {
                  speak('No objects currently detected.');
                }
              }}
              accessibilityLabel="Describe scene"
            >
              <Ionicons name="volume-high" size={28} color={COLORS.text} />
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  camera: { flex: 1 },
  permissionContainer: { flex: 1, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center', padding: 24 },
  permText: { color: COLORS.text, fontSize: 18, textAlign: 'center', marginTop: 16, marginBottom: 24 },
  permBtn: { backgroundColor: COLORS.accent, borderRadius: 12, padding: 16, paddingHorizontal: 32 },
  permBtnText: { color: COLORS.text, fontSize: 16, fontWeight: 'bold' },
  topHud: { padding: 16, paddingTop: Platform.OS === 'ios' ? 60 : 40 },
  safetyBadge: {
    flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start',
    borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, gap: 8,
  },
  safetyText: { color: COLORS.text, fontWeight: 'bold', fontSize: 14, flexShrink: 1 },
  detectionBox: {
    position: 'absolute', borderWidth: 2, borderRadius: 8,
    height: 70, justifyContent: 'flex-end',
  },
  detectionLabel: {
    color: COLORS.text, fontSize: 11, fontWeight: 'bold',
    paddingHorizontal: 6, paddingVertical: 3, borderRadius: 4,
  },
  ocrBubble: {
    position: 'absolute', top: H * 0.3, left: 24, right: 24,
    backgroundColor: 'rgba(0,0,0,0.75)', borderRadius: 16,
    padding: 20, flexDirection: 'row', alignItems: 'center', gap: 12,
  },
  ocrText: { color: COLORS.text, fontSize: 20, fontWeight: 'bold', flex: 1 },
  bottomControls: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: 'rgba(26,26,46,0.90)', paddingBottom: Platform.OS === 'ios' ? 32 : 20,
    paddingTop: 12, paddingHorizontal: 24,
  },
  modeRow: { flexDirection: 'row', justifyContent: 'center', gap: 12, marginBottom: 16 },
  modeBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: COLORS.card, borderRadius: 20,
    paddingHorizontal: 18, paddingVertical: 8,
  },
  modeBtnActive: { backgroundColor: COLORS.accent },
  modeBtnText: { color: COLORS.text, fontSize: 14, fontWeight: '600' },
  controlRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sideBtn: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: COLORS.card, alignItems: 'center', justifyContent: 'center',
  },
  mainBtn: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: COLORS.accent, alignItems: 'center', justifyContent: 'center',
    shadowColor: COLORS.accent, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.5, shadowRadius: 8,
    elevation: 8,
  },
  mainBtnActive: { backgroundColor: '#c0392b' },
  mainBtnText: { color: COLORS.text, fontSize: 11, fontWeight: 'bold', marginTop: 2 },
});
