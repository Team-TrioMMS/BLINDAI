import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { speak } from '../utils/speech';

const COLORS = {
  primary: '#1a1a2e',
  accent: '#e94560',
  secondary: '#16213e',
  card: '#0f3460',
  text: '#ffffff',
  muted: '#a0a0b0',
  success: '#4caf50',
};

const FEATURES = [
  {
    icon: 'scan',
    title: 'AI Object Detection',
    description: 'Detects people, vehicles, furniture, stairs and other objects in real time using the camera.',
    color: '#e94560',
  },
  {
    icon: 'warning',
    title: 'Obstacle & Proximity Alert',
    description: 'Estimates distance (near/medium/far) and warns you when obstacles are dangerously close.',
    color: '#ff9800',
  },
  {
    icon: 'eye',
    title: 'AI Scene Understanding',
    description: 'Analyzes the whole scene and generates a voice description of your surroundings.',
    color: '#2196f3',
  },
  {
    icon: 'text',
    title: 'Text Recognition (OCR)',
    description: 'Reads signs, room numbers, labels, and documents aloud using OCR technology.',
    color: '#9c27b0',
  },
  {
    icon: 'navigate',
    title: 'Navigation Assistance',
    description: 'GPS-based directional voice guidance to help you reach your destination safely.',
    color: '#4caf50',
  },
  {
    icon: 'alert-circle',
    title: 'Emergency Alert',
    description: 'One-tap emergency button that sends your location to configured emergency contacts.',
    color: '#f44336',
  },
  {
    icon: 'volume-high',
    title: 'Voice Assistant',
    description: 'All information is communicated through clear voice guidance customizable to your needs.',
    color: '#00bcd4',
  },
  {
    icon: 'time',
    title: 'Safety Event Log',
    description: 'Records all safety events, navigation trips, and emergency alerts for review.',
    color: '#607d8b',
  },
];

export default function HomeScreen({ navigation }) {
  const { user, settings } = useApp();

  const handleFeatureTap = (feature) => {
    speak(feature.description, { rate: settings.speechRate });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
      {/* Welcome */}
      <View style={styles.welcome}>
        <View style={styles.welcomeRow}>
          <View>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.userName}>{user?.name} 👋</Text>
          </View>
          <TouchableOpacity
            style={styles.voiceBtn}
            onPress={() => speak(`Welcome to BlindGuide, ${user?.name}. Tap a feature to hear its description.`, { rate: settings.speechRate })}
            accessibilityLabel="Hear welcome message"
          >
            <Ionicons name="volume-high" size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>Your AI-powered vision assistant</Text>
      </View>

      {/* Quick Actions */}
      <Text style={styles.sectionLabel}>Quick Actions</Text>
      <View style={styles.quickActions}>
        <TouchableOpacity
          style={[styles.quickBtn, { backgroundColor: COLORS.accent }]}
          onPress={() => navigation.navigate('Camera')}
          accessibilityLabel="Open camera to start detection"
        >
          <Ionicons name="eye" size={28} color={COLORS.text} />
          <Text style={styles.quickBtnText}>Start Detection</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.quickBtn, { backgroundColor: COLORS.card }]}
          onPress={() => navigation.navigate('Navigation')}
          accessibilityLabel="Open navigation"
        >
          <Ionicons name="navigate" size={28} color={COLORS.text} />
          <Text style={styles.quickBtnText}>Navigate</Text>
        </TouchableOpacity>
      </View>

      {/* Features */}
      <Text style={styles.sectionLabel}>App Features</Text>
      <Text style={styles.featureHint}>
        <Ionicons name="volume-medium" size={12} color={COLORS.muted} /> Tap any feature to hear its description
      </Text>
      <View style={styles.featureGrid}>
        {FEATURES.map((f, i) => (
          <TouchableOpacity
            key={i}
            style={styles.featureCard}
            onPress={() => handleFeatureTap(f)}
            accessibilityLabel={`${f.title}: ${f.description}`}
          >
            <View style={[styles.featureIconBox, { backgroundColor: f.color + '25', borderColor: f.color + '50' }]}>
              <Ionicons name={f.icon} size={22} color={f.color} />
            </View>
            <Text style={styles.featureTitle}>{f.title}</Text>
            <Text style={styles.featureDesc} numberOfLines={3}>{f.description}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* System Info */}
      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={18} color={COLORS.muted} />
        <Text style={styles.infoText}>
          BlindGuide uses AI-powered vision, speech synthesis, GPS, and OCR to provide real-time environmental awareness for visually impaired users.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.primary },
  scroll: { padding: 16, paddingBottom: 32 },
  welcome: { backgroundColor: COLORS.secondary, borderRadius: 20, padding: 20, marginBottom: 20 },
  welcomeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  greeting: { color: COLORS.muted, fontSize: 14 },
  userName: { fontSize: 24, fontWeight: 'bold', color: COLORS.text },
  subtitle: { color: COLORS.muted, fontSize: 13 },
  voiceBtn: { backgroundColor: COLORS.accent, width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  sectionLabel: { fontSize: 16, fontWeight: '600', color: COLORS.text, marginBottom: 10 },
  featureHint: { color: COLORS.muted, fontSize: 12, marginBottom: 12 },
  quickActions: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  quickBtn: { flex: 1, borderRadius: 16, padding: 20, alignItems: 'center', gap: 8 },
  quickBtnText: { color: COLORS.text, fontWeight: '600', fontSize: 14 },
  featureGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 20 },
  featureCard: {
    width: '47%', backgroundColor: COLORS.secondary, borderRadius: 14,
    padding: 14, gap: 8,
  },
  featureIconBox: { width: 44, height: 44, borderRadius: 12, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  featureTitle: { fontSize: 13, fontWeight: '600', color: COLORS.text },
  featureDesc: { fontSize: 11, color: COLORS.muted, lineHeight: 16 },
  infoCard: { backgroundColor: COLORS.secondary, borderRadius: 14, padding: 16, flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  infoText: { color: COLORS.muted, fontSize: 12, lineHeight: 18, flex: 1 },
});
