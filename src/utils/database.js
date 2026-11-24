import * as SQLite from 'expo-sqlite';

let db = null;

export const initDB = async () => {
  db = await SQLite.openDatabaseAsync('blindguide.db');

  await db.execAsync(`
    PRAGMA journal_mode = WAL;

    -- Users table
    CREATE TABLE IF NOT EXISTS users (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      name        TEXT    NOT NULL,
      email       TEXT    NOT NULL UNIQUE,
      password    TEXT    NOT NULL,
      created_at  TEXT    DEFAULT (datetime('now'))
    );

    -- Emergency contacts table
    CREATE TABLE IF NOT EXISTS emergency_contacts (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id     INTEGER NOT NULL,
      name        TEXT    NOT NULL,
      phone       TEXT    NOT NULL,
      created_at  TEXT    DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    -- Safety event history table
    CREATE TABLE IF NOT EXISTS events (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id     INTEGER NOT NULL,
      type        TEXT    NOT NULL,
      message     TEXT    NOT NULL,
      location    TEXT,
      created_at  TEXT    DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    -- User settings table (one row per user)
    CREATE TABLE IF NOT EXISTS settings (
      id                    INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id               INTEGER NOT NULL UNIQUE,
      speech_rate           REAL    DEFAULT 1.0,
      speech_pitch          REAL    DEFAULT 1.0,
      voice_enabled         INTEGER DEFAULT 1,
      vibration_enabled     INTEGER DEFAULT 1,
      detection_sensitivity TEXT    DEFAULT 'medium',
      language              TEXT    DEFAULT 'en',
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  console.log('[DB] Database initialized successfully');
  return db;
};

export const getDB = () => db;

export const registerUser = async (name, email, password) => {
  const existing = await db.getFirstAsync(
    'SELECT id FROM users WHERE email = ?', [email]
  );
  if (existing) throw new Error('Email already registered.');

  const result = await db.runAsync(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, password]
  );
  const user = await db.getFirstAsync(
    'SELECT id, name, email, created_at FROM users WHERE id = ?',
    [result.lastInsertRowId]
  );
  return user;
};

export const loginUser = async (email, password) => {
  const user = await db.getFirstAsync(
    'SELECT id, name, email, created_at FROM users WHERE email = ? AND password = ?',
    [email, password]
  );
  return user || null;
};

export const getUserById = async (id) => {
  return await db.getFirstAsync(
    'SELECT id, name, email, created_at FROM users WHERE id = ?', [id]
  );
};

//SETTINGS OPERATIONS

export const getSettings = async (userId) => {
  let settings = await db.getFirstAsync(
    'SELECT * FROM settings WHERE user_id = ?', [userId]
  );
  if (!settings) {
    await db.runAsync(
      'INSERT INTO settings (user_id) VALUES (?)', [userId]
    );
    settings = await db.getFirstAsync(
      'SELECT * FROM settings WHERE user_id = ?', [userId]
    );
  }
  return {
    speechRate: settings.speech_rate,
    speechPitch: settings.speech_pitch,
    voiceEnabled: !!settings.voice_enabled,
    vibrationEnabled: !!settings.vibration_enabled,
    detectionSensitivity: settings.detection_sensitivity,
    language: settings.language,
  };
};

export const saveSettings = async (userId, settings) => {
  await db.runAsync(
    `INSERT INTO settings (user_id, speech_rate, speech_pitch, voice_enabled, vibration_enabled, detection_sensitivity, language)
     VALUES (?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(user_id) DO UPDATE SET
       speech_rate = excluded.speech_rate,
       speech_pitch = excluded.speech_pitch,
       voice_enabled = excluded.voice_enabled,
       vibration_enabled = excluded.vibration_enabled,
       detection_sensitivity = excluded.detection_sensitivity,
       language = excluded.language`,
    [
      userId,
      settings.speechRate,
      settings.speechPitch,
      settings.voiceEnabled ? 1 : 0,
      settings.vibrationEnabled ? 1 : 0,
      settings.detectionSensitivity,
      settings.language,
    ]
  );
};

//EMERGENCY CONTACTS
export const getEmergencyContacts = async (userId) => {
  return await db.getAllAsync(
    'SELECT * FROM emergency_contacts WHERE user_id = ? ORDER BY created_at DESC',
    [userId]
  );
};

export const addEmergencyContact = async (userId, name, phone) => {
  const result = await db.runAsync(
    'INSERT INTO emergency_contacts (user_id, name, phone) VALUES (?, ?, ?)',
    [userId, name, phone]
  );
  return await db.getFirstAsync(
    'SELECT * FROM emergency_contacts WHERE id = ?',
    [result.lastInsertRowId]
  );
};

export const deleteEmergencyContact = async (id) => {
  await db.runAsync('DELETE FROM emergency_contacts WHERE id = ?', [id]);
};

//EVENTS

export const insertEvent = async (userId, type, message, location = null) => {
  const result = await db.runAsync(
    'INSERT INTO events (user_id, type, message, location) VALUES (?, ?, ?, ?)',
    [userId, type, message, location]
  );
  return await db.getFirstAsync(
    'SELECT * FROM events WHERE id = ?',
    [result.lastInsertRowId]
  );
};

export const getEvents = async (userId, limit = 100) => {
  return await db.getAllAsync(
    'SELECT * FROM events WHERE user_id = ? ORDER BY created_at DESC LIMIT ?',
    [userId, limit]
  );
};

export const clearEvents = async (userId) => {
  await db.runAsync('DELETE FROM events WHERE user_id = ?', [userId]);
};

export const getEventStats = async (userId) => {
  return await db.getAllAsync(
    'SELECT type, COUNT(*) as count FROM events WHERE user_id = ? GROUP BY type',
    [userId]
  );
};