const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const { JWT_SECRET } = require('../middleware/authMiddleware');

// Register a new user
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const existing = await db.getAsync('SELECT id FROM users WHERE email = ?', [cleanEmail]);
    if (existing) {
      return res.status(400).json({ success: false, message: 'Email already registered.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await db.runAsync(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name.trim(), cleanEmail, hashedPassword]
    );

    const user = await db.getAsync(
      'SELECT id, name, email, speech_rate, speech_pitch, voice_enabled, vibration_enabled, detection_sensitivity, language, created_at FROM users WHERE id = ?',
      [result.lastID]
    );

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '30d' });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ success: false, message: 'Server error during registration.' });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = await db.getAsync('SELECT * FROM users WHERE email = ?', [cleanEmail]);
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '30d' });

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      settings: {
        speechRate: user.speech_rate,
        speechPitch: user.speech_pitch,
        voiceEnabled: Boolean(user.voice_enabled),
        vibrationEnabled: Boolean(user.vibration_enabled),
        detectionSensitivity: user.detection_sensitivity,
        language: user.language
      },
      createdAt: user.created_at
    };

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: safeUser
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error during login.' });
  }
};

// Get current user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await db.getAsync(
      'SELECT id, name, email, speech_rate, speech_pitch, voice_enabled, vibration_enabled, detection_sensitivity, language, created_at FROM users WHERE id = ?',
      [req.user.id]
    );

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        settings: {
          speechRate: user.speech_rate,
          speechPitch: user.speech_pitch,
          voiceEnabled: Boolean(user.voice_enabled),
          vibrationEnabled: Boolean(user.vibration_enabled),
          detectionSensitivity: user.detection_sensitivity,
          language: user.language
        },
        createdAt: user.created_at
      }
    });
  } catch (err) {
    console.error('GetProfile error:', err);
    res.status(500).json({ success: false, message: 'Server error fetching profile.' });
  }
};

// Update user accessibility settings
exports.updateSettings = async (req, res) => {
  try {
    const { speechRate, speechPitch, voiceEnabled, vibrationEnabled, detectionSensitivity, language } = req.body;

    await db.runAsync(
      `UPDATE users SET
        speech_rate = COALESCE(?, speech_rate),
        speech_pitch = COALESCE(?, speech_pitch),
        voice_enabled = COALESCE(?, voice_enabled),
        vibration_enabled = COALESCE(?, vibration_enabled),
        detection_sensitivity = COALESCE(?, detection_sensitivity),
        language = COALESCE(?, language)
      WHERE id = ?`,
      [
        speechRate,
        speechPitch,
        voiceEnabled !== undefined ? (voiceEnabled ? 1 : 0) : null,
        vibrationEnabled !== undefined ? (vibrationEnabled ? 1 : 0) : null,
        detectionSensitivity,
        language,
        req.user.id
      ]
    );

    res.json({ success: true, message: 'Settings updated successfully' });
  } catch (err) {
    console.error('UpdateSettings error:', err);
    res.status(500).json({ success: false, message: 'Server error updating settings.' });
  }
};
