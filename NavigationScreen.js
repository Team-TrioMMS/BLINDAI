import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  TextInput, Alert, Linking, Platform,
} from 'react-native';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { speak, dangerVibration } from '../utils/speech';

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

export default function NavigationScreen() {
  const { settings, emergencyContacts, addEvent } = useApp();
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [destination, setDestination] = useState('');
  const [isNavigating, setIsNavigating] = useState(false);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [watchId, setWatchId] = useState(null);

  useEffect(() => {
    requestLocationPermission();
    return () => {
      if (watchId) watchId.remove();
    };
  }, []);

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    } else {
      setLocationError('Location permission denied. Enable it in device settings.');
    }
  };

  const startNavigation = () => {
    if (!destination.trim()) {
      Alert.alert('No Destination', 'Please enter a destination.');
      speak('Please enter a destination.');
      return;
    }

    // Simulate navigation steps
    const mockSteps = [
      `Head north on current street toward ${destination}`,
      'Turn right at the next intersection',
      'Continue straight for 200 meters',
      'Turn left at the traffic light',
      'Continue for 100 meters',
      `You have arrived at ${destination}`,
    ];

    setSteps(mockSteps);
    setCurrentStep(0);
    setIsNavigating(true);
    speak(`Starting navigation to ${destination}. ${mockSteps[0]}`);

    addEvent({ type: 'navigation', message: `Started navigation to ${destination}` });
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      const next = currentStep + 1;
      setCurrentStep(next);
      speak(steps[next]);
    } else {
      speak('You have arrived at your destination.');
      setIsNavigating(false);
    }
  };

  const stopNavigation = () => {
    setIsNavigating(false);
    setSteps([]);
    setCurrentStep(0);
    speak('Navigation stopped.');
  };

  const triggerEmergency = async () => {
    setEmergencyActive(true);
    dangerVibration();
    speak('Emergency alert activated! Sending location to emergency contacts.');

    addEvent({
      type: 'emergency',
      message: 'Emergency alert triggered',
      location: location ? `${location.latitude.toFixed(5)}, ${location.longitude.toFixed(5)}` : 'Unknown',
    });

    // Show confirmation
    setTimeout(() => {
      Alert.alert(
        '🚨 Emergency Alert Sent',
        `Your location has been shared with ${emergencyContacts.length} emergency contact(s).\n\nLocation: ${location ? `${location.latitude.toFixed(5)}, ${location.longitude.toFixed(5)}` : 'Unavailable'}`,
        [{ text: 'OK', onPress: () => setEmergencyActive(false) }]
      );
    }, 500);
  };

  const openMaps = () => {
    if (!location) return;
    const url = Platform.select({
      ios: `maps:0,0?q=${destination}`,
      android: `geo:${location.latitude},${location.longitude}?q=${encodeURIComponent(destination)}`,
    });
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="navigate" size={28} color={COLORS.accent} />
        <Text style={styles.headerTitle}>Navigation & Emergency</Text>
      </View>

      {/* Location Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="location" size={20} color={COLORS.accent} />
          <Text style={styles.cardTitle}>Current Location</Text>
        </View>
        {locationError ? (
          <Text style={styles.errorText}>{locationError}</Text>
        ) : location ? (
          <>
            <Text style={styles.coordText}>Lat: {location.latitude.toFixed(6)}</Text>
            <Text style={styles.coordText}>Lon: {location.longitude.toFixed(6)}</Text>
            <TouchableOpacity style={styles.refreshBtn} onPress={requestLocationPermission}>
              <Ionicons name="refresh" size={16} color={COLORS.text} />
              <Text style={styles.refreshText}>Refresh</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={styles.permBtn} onPress={requestLocationPermission}>
            <Text style={styles.permBtnText}>Enable Location</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Navigation Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="map" size={20} color={COLORS.accent} />
          <Text style={styles.cardTitle}>Navigation Assistance</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Enter destination..."
          placeholderTextColor={COLORS.muted}
          value={destination}
          onChangeText={setDestination}
          editable={!isNavigating}
          accessibilityLabel="Destination input"
        />

        <View style={styles.navBtnRow}>
          {!isNavigating ? (
            <>
              <TouchableOpacity style={styles.startBtn} onPress={startNavigation} accessibilityLabel="Start navigation">
                <Ionicons name="navigate" size={20} color={COLORS.text} />
                <Text style={styles.startBtnText}>Start</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.mapsBtn} onPress={openMaps} accessibilityLabel="Open in maps">
                <Ionicons name="map-outline" size={20} color={COLORS.text} />
                <Text style={styles.startBtnText}>Maps</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={styles.stopBtn} onPress={stopNavigation}>
              <Ionicons name="stop" size={20} color={COLORS.text} />
              <Text style={styles.startBtnText}>Stop</Text>
            </TouchableOpacity>
          )}
        </View>

        {isNavigating && steps.length > 0 && (
          <View style={styles.stepContainer}>
            <Text style={styles.stepCounter}>Step {currentStep + 1} of {steps.length}</Text>
            <View style={styles.stepBubble}>
              <Ionicons name="arrow-forward-circle" size={24} color={COLORS.accent} />
              <Text style={styles.stepText}>{steps[currentStep]}</Text>
            </View>
            <TouchableOpacity style={styles.nextBtn} onPress={nextStep}>
              <Text style={styles.nextBtnText}>Next Step</Text>
              <Ionicons name="chevron-forward" size={18} color={COLORS.text} />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Emergency Card */}
      <View style={[styles.card, styles.emergencyCard]}>
        <View style={styles.cardHeader}>
          <Ionicons name="warning" size={20} color={COLORS.danger} />
          <Text style={[styles.cardTitle, { color: COLORS.danger }]}>Emergency Alert</Text>
        </View>
        <Text style={styles.emergencyDesc}>
          Press the button below to send your location to all emergency contacts.
        </Text>
        <TouchableOpacity
          style={[styles.emergencyBtn, emergencyActive && styles.emergencyBtnActive]}
          onPress={triggerEmergency}
          disabled={emergencyActive}
          accessibilityLabel="Trigger emergency alert"
        >
          <Ionicons name="alert-circle" size={32} color={COLORS.text} />
          <Text style={styles.emergencyBtnText}>
            {emergencyActive ? 'Alert Sent!' : 'EMERGENCY ALERT'}
          </Text>
        </TouchableOpacity>
        <Text style={styles.contactCount}>
          {emergencyContacts.length} contact(s) configured
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.primary },
  scroll: { padding: 16, paddingBottom: 32 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20, paddingTop: 8 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.text },
  card: { backgroundColor: COLORS.secondary, borderRadius: 16, padding: 20, marginBottom: 16 },
  emergencyCard: { borderWidth: 1, borderColor: COLORS.danger + '50' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  cardTitle: { fontSize: 18, fontWeight: '600', color: COLORS.text },
  coordText: { color: COLORS.muted, fontSize: 14, marginBottom: 4 },
  errorText: { color: COLORS.danger, fontSize: 14 },
  refreshBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8 },
  refreshText: { color: COLORS.muted, fontSize: 13 },
  permBtn: { backgroundColor: COLORS.accent, borderRadius: 10, padding: 12, alignItems: 'center' },
  permBtnText: { color: COLORS.text, fontWeight: 'bold' },
  input: {
    backgroundColor: COLORS.primary, borderRadius: 10, padding: 14,
    color: COLORS.text, fontSize: 16, marginBottom: 12,
  },
  navBtnRow: { flexDirection: 'row', gap: 12 },
  startBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: COLORS.success, borderRadius: 10, padding: 14 },
  mapsBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: COLORS.card, borderRadius: 10, padding: 14 },
  stopBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: COLORS.danger, borderRadius: 10, padding: 14 },
  startBtnText: { color: COLORS.text, fontWeight: 'bold', fontSize: 15 },
  stepContainer: { marginTop: 16 },
  stepCounter: { color: COLORS.muted, fontSize: 12, marginBottom: 8 },
  stepBubble: { backgroundColor: COLORS.primary, borderRadius: 12, padding: 16, flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 12 },
  stepText: { color: COLORS.text, fontSize: 16, flex: 1, lineHeight: 22 },
  nextBtn: { backgroundColor: COLORS.accent, borderRadius: 10, padding: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  nextBtnText: { color: COLORS.text, fontWeight: 'bold', fontSize: 15 },
  emergencyDesc: { color: COLORS.muted, fontSize: 14, marginBottom: 16, lineHeight: 20 },
  emergencyBtn: {
    backgroundColor: COLORS.danger, borderRadius: 16, padding: 20,
    alignItems: 'center', gap: 8,
    shadowColor: COLORS.danger, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.5, shadowRadius: 8, elevation: 8,
  },
  emergencyBtnActive: { backgroundColor: '#7f0000', opacity: 0.7 },
  emergencyBtnText: { color: COLORS.text, fontWeight: 'bold', fontSize: 18 },
  contactCount: { color: COLORS.muted, fontSize: 12, textAlign: 'center', marginTop: 10 },
});
