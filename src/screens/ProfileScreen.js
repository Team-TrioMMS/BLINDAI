import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  Switch, TextInput, Alert,
} from 'react-native';
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
  danger: '#f44336',
};

export default function ProfileScreen() {
  const { user, logout, settings, updateSettings, emergencyContacts, addEmergencyContact, removeEmergencyContact, clearHistory } = useApp();
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [showAddContact, setShowAddContact] = useState(false);

  const handleAddContact = () => {
    if (!contactName.trim() || !contactPhone.trim()) {
      Alert.alert('Error', 'Please enter both name and phone number.');
      return;
    }
    addEmergencyContact(contactName.trim(), contactPhone.trim());
    setContactName('');
    setContactPhone('');
    setShowAddContact(false);
    speak(`Emergency contact ${contactName} added.`);
  };

  const handleRemoveContact = (id, name) => {
    Alert.alert('Remove Contact', `Remove ${name} from emergency contacts?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove', style: 'destructive',
        onPress: () => {
          removeEmergencyContact(id);
          speak(`${name} removed from emergency contacts.`);
        },
      },
    ]);
  };

  const handleClearHistory = () => {
    Alert.alert('Clear History', 'Delete all safety event history?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear All', style: 'destructive', onPress: () => { clearHistory(); speak('Event history cleared.'); } },
    ]);
  };

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: logout },
    ]);
  };

  const Row = ({ label, children }) => (
    <View style={styles.settingRow}>
      <Text style={styles.settingLabel}>{label}</Text>
      {children}
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
      {/* User Info */}
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={40} color={COLORS.text} />
        </View>
        <Text style={styles.userName}>{user?.name}</Text>
        <Text style={styles.userEmail}>{user?.email}</Text>
      </View>

      {/* Voice & Accessibility Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <Ionicons name="accessibility" size={18} color={COLORS.accent} /> Accessibility
        </Text>

        <Row label="Voice Guidance">
          <Switch
            value={settings.voiceEnabled}
            onValueChange={v => updateSettings({ voiceEnabled: v })}
            trackColor={{ true: COLORS.accent }}
            thumbColor={COLORS.text}
            accessibilityLabel="Toggle voice guidance"
          />
        </Row>

        <Row label="Vibration Alerts">
          <Switch
            value={settings.vibrationEnabled}
            onValueChange={v => updateSettings({ vibrationEnabled: v })}
            trackColor={{ true: COLORS.accent }}
            thumbColor={COLORS.text}
            accessibilityLabel="Toggle vibration alerts"
          />
        </Row>

        <Row label={`Speech Rate: ${settings.speechRate.toFixed(1)}x`}>
          <View style={styles.rateControls}>
            <TouchableOpacity
              style={styles.rateBtn}
              onPress={() => updateSettings({ speechRate: Math.max(0.5, settings.speechRate - 0.1) })}
              accessibilityLabel="Decrease speech rate"
            >
              <Ionicons name="remove" size={18} color={COLORS.text} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.rateBtn}
              onPress={() => updateSettings({ speechRate: Math.min(2.0, settings.speechRate + 0.1) })}
              accessibilityLabel="Increase speech rate"
            >
              <Ionicons name="add" size={18} color={COLORS.text} />
            </TouchableOpacity>
          </View>
        </Row>

        <Row label="Detection Sensitivity">
          <View style={styles.sensitivityRow}>
            {['low', 'medium', 'high'].map(level => (
              <TouchableOpacity
                key={level}
                style={[styles.sensitivityBtn, settings.detectionSensitivity === level && styles.sensitivityBtnActive]}
                onPress={() => updateSettings({ detectionSensitivity: level })}
                accessibilityLabel={`Set detection sensitivity to ${level}`}
              >
                <Text style={[styles.sensitivityText, settings.detectionSensitivity === level && { color: COLORS.text }]}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Row>
      </View>

      {/* Emergency Contacts */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            <Ionicons name="call" size={18} color={COLORS.accent} /> Emergency Contacts
          </Text>
          <TouchableOpacity onPress={() => setShowAddContact(!showAddContact)} accessibilityLabel="Add emergency contact">
            <Ionicons name={showAddContact ? 'close' : 'add-circle'} size={28} color={COLORS.accent} />
          </TouchableOpacity>
        </View>

        {showAddContact && (
          <View style={styles.addContactForm}>
            <TextInput
              style={styles.input}
              placeholder="Contact Name"
              placeholderTextColor={COLORS.muted}
              value={contactName}
              onChangeText={setContactName}
              accessibilityLabel="Contact name"
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              placeholderTextColor={COLORS.muted}
              value={contactPhone}
              onChangeText={setContactPhone}
              keyboardType="phone-pad"
              accessibilityLabel="Contact phone number"
            />
            <TouchableOpacity style={styles.addBtn} onPress={handleAddContact}>
              <Text style={styles.addBtnText}>Add Contact</Text>
            </TouchableOpacity>
          </View>
        )}

        {emergencyContacts.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="people" size={36} color={COLORS.muted} />
            <Text style={styles.emptyText}>No emergency contacts added yet.</Text>
          </View>
        ) : (
          emergencyContacts.map(contact => (
            <View key={contact.id} style={styles.contactCard}>
              <View style={styles.contactIcon}>
                <Ionicons name="person" size={20} color={COLORS.text} />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactPhone}>{contact.phone}</Text>
              </View>
              <TouchableOpacity
                onPress={() => handleRemoveContact(contact.id, contact.name)}
                accessibilityLabel={`Remove ${contact.name}`}
              >
                <Ionicons name="trash-outline" size={22} color={COLORS.danger} />
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>

      {/* Voice Test */}
      <TouchableOpacity
        style={styles.voiceTestBtn}
        onPress={() => speak('BlindGuide voice assistant is working correctly. All systems are operational.', { rate: settings.speechRate })}
        accessibilityLabel="Test voice assistant"
      >
        <Ionicons name="volume-high" size={20} color={COLORS.text} />
        <Text style={styles.voiceTestText}>Test Voice Assistant</Text>
      </TouchableOpacity>

      {/* Clear History */}
      <TouchableOpacity style={styles.clearHistoryBtn} onPress={handleClearHistory} accessibilityLabel="Clear event history">
        <Ionicons name="trash-outline" size={20} color={COLORS.text} />
        <Text style={styles.voiceTestText}>Clear Event History</Text>
      </TouchableOpacity>

      {/* DB Info */}
      <View style={styles.dbInfo}>
        <Ionicons name="server" size={14} color={COLORS.success} />
        <Text style={styles.dbInfoText}>Data stored in SQLite (local device database)</Text>
      </View>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} accessibilityLabel="Sign out">
        <Ionicons name="log-out-outline" size={20} color={COLORS.text} />
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>

      <Text style={styles.version}>BlindGuide v1.0.0 • Team Trio • SE-331</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.primary },
  scroll: { padding: 16, paddingBottom: 40 },
  profileCard: { alignItems: 'center', marginBottom: 24, paddingVertical: 24 },
  avatar: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: COLORS.accent, alignItems: 'center', justifyContent: 'center', marginBottom: 12,
  },
  userName: { fontSize: 22, fontWeight: 'bold', color: COLORS.text },
  userEmail: { fontSize: 14, color: COLORS.muted, marginTop: 4 },
  section: { backgroundColor: COLORS.secondary, borderRadius: 16, padding: 16, marginBottom: 16 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: COLORS.text, marginBottom: 12 },
  settingRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: COLORS.card,
  },
  settingLabel: { color: COLORS.text, fontSize: 15 },
  rateControls: { flexDirection: 'row', gap: 8 },
  rateBtn: { backgroundColor: COLORS.card, borderRadius: 8, width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  sensitivityRow: { flexDirection: 'row', gap: 6 },
  sensitivityBtn: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, backgroundColor: COLORS.card },
  sensitivityBtnActive: { backgroundColor: COLORS.accent },
  sensitivityText: { color: COLORS.muted, fontSize: 13, fontWeight: '500' },
  addContactForm: { backgroundColor: COLORS.primary, borderRadius: 12, padding: 12, marginBottom: 12 },
  input: { backgroundColor: COLORS.card, borderRadius: 10, padding: 12, color: COLORS.text, fontSize: 15, marginBottom: 10 },
  addBtn: { backgroundColor: COLORS.accent, borderRadius: 10, padding: 12, alignItems: 'center' },
  addBtnText: { color: COLORS.text, fontWeight: 'bold', fontSize: 15 },
  emptyState: { alignItems: 'center', paddingVertical: 20 },
  emptyText: { color: COLORS.muted, fontSize: 14, marginTop: 8 },
  contactCard: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: COLORS.card, gap: 12 },
  contactIcon: { width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.card, alignItems: 'center', justifyContent: 'center' },
  contactInfo: { flex: 1 },
  contactName: { color: COLORS.text, fontSize: 16, fontWeight: '500' },
  contactPhone: { color: COLORS.muted, fontSize: 13 },
  voiceTestBtn: { backgroundColor: COLORS.card, borderRadius: 12, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 12 },
  voiceTestText: { color: COLORS.text, fontSize: 16, fontWeight: '500' },
  logoutBtn: { backgroundColor: COLORS.danger + '30', borderRadius: 12, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, borderWidth: 1, borderColor: COLORS.danger + '60', marginBottom: 24 },
  logoutText: { color: COLORS.text, fontSize: 16, fontWeight: '500' },
  version: { textAlign: 'center', color: COLORS.muted, fontSize: 12 },
  clearHistoryBtn: { backgroundColor: COLORS.card, borderRadius: 12, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 12 },
  dbInfo: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 12 },
  dbInfoText: { color: COLORS.success, fontSize: 11 },
});
