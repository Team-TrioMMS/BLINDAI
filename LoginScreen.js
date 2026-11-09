import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, Alert, KeyboardAvoidingView, Platform, ActivityIndicator,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { speak } from '../utils/speech';
import { Ionicons } from '@expo/vector-icons';

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

export default function LoginScreen() {
  const { login, register, dbReady } = useApp();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    if (!email.trim() || !password.trim()) {
      const msg = 'Please fill in all required fields.';
      setError(msg);
      speak(msg);
      return;
    }
    if (isRegister && !name.trim()) {
      const msg = 'Please enter your name.';
      setError(msg);
      speak(msg);
      return;
    }
    if (password.length < 4) {
      const msg = 'Password must be at least 4 characters.';
      setError(msg);
      speak(msg);
      return;
    }

    setLoading(true);
    try {
      if (isRegister) {
        const user = await register(name.trim(), email.trim().toLowerCase(), password);
        speak(`Welcome to BlindGuide, ${user.name}. Your account has been created.`);
      } else {
        const user = await login(email.trim().toLowerCase(), password);
        speak(`Welcome back, ${user.name}.`);
      }
    } catch (e) {
      const msg = e.message || 'Something went wrong. Please try again.';
      setError(msg);
      speak(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceHint = () => {
    speak(isRegister
      ? 'Registration screen. Enter your name, email, and password to create an account.'
      : 'Login screen. Enter your email and password to sign in to BlindGuide.');
  };

  if (!dbReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.accent} />
        <Text style={styles.loadingText}>Initializing database...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Ionicons name="eye-off" size={64} color={COLORS.accent} />
          <Text style={styles.logoText}>BlindGuide</Text>
          <Text style={styles.logoSubtext}>AI Vision Assistant</Text>
        </View>

        {/* Voice Hint */}
        <TouchableOpacity style={styles.voiceHintBtn} onPress={handleVoiceHint} accessibilityLabel="Hear instructions">
          <Ionicons name="volume-high" size={20} color={COLORS.text} />
          <Text style={styles.voiceHintText}>Hear Instructions</Text>
        </TouchableOpacity>

        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{isRegister ? 'Create Account' : 'Sign In'}</Text>

          {/* Error banner */}
          {!!error && (
            <View style={styles.errorBanner}>
              <Ionicons name="alert-circle" size={16} color={COLORS.text} />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {isRegister && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Your full name"
                placeholderTextColor={COLORS.muted}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                accessibilityLabel="Full name"
              />
            </View>
          )}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="your@email.com"
              placeholderTextColor={COLORS.muted}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              accessibilityLabel="Email address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor={COLORS.muted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              accessibilityLabel="Password"
            />
          </View>

          <TouchableOpacity
            style={[styles.submitBtn, loading && styles.submitBtnDisabled]}
            onPress={handleSubmit}
            disabled={loading}
            accessibilityLabel={isRegister ? 'Register button' : 'Login button'}
          >
            {loading
              ? <ActivityIndicator color={COLORS.text} />
              : <Text style={styles.submitBtnText}>{isRegister ? 'Create Account' : 'Sign In'}</Text>
            }
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { setIsRegister(!isRegister); setError(''); }} style={styles.switchBtn}>
            <Text style={styles.switchText}>
              {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Register"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* DB Badge */}
        <View style={styles.dbBadge}>
          <Ionicons name="server" size={12} color={COLORS.success} />
          <Text style={styles.dbText}>SQLite Database Active</Text>
        </View>

        <Text style={styles.teamText}>Team Trio • SE-331 • Fall 2026</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.primary },
  loadingContainer: { flex: 1, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center' },
  loadingText: { color: COLORS.muted, fontSize: 16, marginTop: 16 },
  scroll: { flexGrow: 1, padding: 24, justifyContent: 'center' },
  logoContainer: { alignItems: 'center', marginBottom: 24 },
  logoText: { fontSize: 36, fontWeight: 'bold', color: COLORS.text, marginTop: 12 },
  logoSubtext: { fontSize: 14, color: COLORS.muted, marginTop: 4 },
  voiceHintBtn: {
    flexDirection: 'row', alignItems: 'center', alignSelf: 'center',
    backgroundColor: COLORS.card, borderRadius: 20,
    paddingHorizontal: 16, paddingVertical: 8, marginBottom: 20, gap: 8,
  },
  voiceHintText: { color: COLORS.text, fontSize: 14 },
  card: { backgroundColor: COLORS.secondary, borderRadius: 16, padding: 24 },
  cardTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.text, marginBottom: 16, textAlign: 'center' },
  errorBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: COLORS.danger + '30', borderRadius: 10,
    padding: 12, marginBottom: 14, borderWidth: 1, borderColor: COLORS.danger + '60',
  },
  errorText: { color: COLORS.text, fontSize: 13, flex: 1 },
  inputGroup: { marginBottom: 16 },
  label: { color: COLORS.muted, fontSize: 13, marginBottom: 6 },
  input: {
    backgroundColor: COLORS.primary, borderRadius: 10, padding: 14,
    color: COLORS.text, fontSize: 16, borderWidth: 1, borderColor: COLORS.card,
  },
  submitBtn: { backgroundColor: COLORS.accent, borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 8 },
  submitBtnDisabled: { opacity: 0.6 },
  submitBtnText: { color: COLORS.text, fontSize: 18, fontWeight: 'bold' },
  switchBtn: { marginTop: 16, alignItems: 'center' },
  switchText: { color: COLORS.muted, fontSize: 14 },
  dbBadge: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 16 },
  dbText: { color: COLORS.success, fontSize: 11 },
  teamText: { textAlign: 'center', color: COLORS.muted, fontSize: 12, marginTop: 8 },
});
