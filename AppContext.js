import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initDB,
  loginUser,
  registerUser,
  getSettings,
  saveSettings,
  getEmergencyContacts,
  addEmergencyContact as dbAddContact,
  deleteEmergencyContact,
  insertEvent,
  getEvents,
  clearEvents,
} from '../utils/database';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [dbReady, setDbReady] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [eventHistory, setEventHistory] = useState([]);
  const [settings, setSettings] = useState({
    speechRate: 1.0,
    speechPitch: 1.0,
    voiceEnabled: true,
    vibrationEnabled: true,
    detectionSensitivity: 'medium',
    language: 'en',
  });

  // ── Init DB on mount ────────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        await initDB();
        setDbReady(true);
        console.log('[AppContext] SQLite DB ready');
      } catch (e) {
        console.error('[AppContext] DB init error:', e);
      }
    })();
  }, []);

  // ── Load user data after login ──────────────────────────────────────────
  const loadUserData = async (u) => {
    const [contacts, events, s] = await Promise.all([
      getEmergencyContacts(u.id),
      getEvents(u.id),
      getSettings(u.id),
    ]);
    setEmergencyContacts(contacts);
    setEventHistory(events);
    setSettings(s);
  };

  // ── Auth ────────────────────────────────────────────────────────────────

  /**
   * Register a new account then auto-login.
   * Throws on duplicate email.
   */
  const register = async (name, email, password) => {
    const newUser = await registerUser(name, email, password);
    setUser(newUser);
    setIsLoggedIn(true);
    await loadUserData(newUser);
    return newUser;
  };

  /**
   * Login with email + password.
   * Returns user or throws 'Invalid credentials'.
   */
  const login = async (email, password) => {
    const foundUser = await loginUser(email, password);
    if (!foundUser) throw new Error('Invalid email or password.');
    setUser(foundUser);
    setIsLoggedIn(true);
    await loadUserData(foundUser);
    return foundUser;
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setEmergencyContacts([]);
    setEventHistory([]);
    setSettings({
      speechRate: 1.0,
      speechPitch: 1.0,
      voiceEnabled: true,
      vibrationEnabled: true,
      detectionSensitivity: 'medium',
      language: 'en',
    });
  };

  // ── Settings ────────────────────────────────────────────────────────────

  const updateSettings = async (patch) => {
    const updated = { ...settings, ...patch };
    setSettings(updated);
    if (user) await saveSettings(user.id, updated);
  };

  // ── Emergency Contacts ──────────────────────────────────────────────────

  const addEmergencyContact = async (name, phone) => {
    const contact = await dbAddContact(user.id, name, phone);
    setEmergencyContacts(prev => [contact, ...prev]);
  };

  const removeEmergencyContact = async (id) => {
    await deleteEmergencyContact(id);
    setEmergencyContacts(prev => prev.filter(c => c.id !== id));
  };

  // ── Events ──────────────────────────────────────────────────────────────

  const addEvent = async ({ type, message, location = null }) => {
    if (!user) return;
    const event = await insertEvent(user.id, type, message, location);
    setEventHistory(prev => [event, ...prev].slice(0, 100));
  };

  const clearHistory = async () => {
    if (!user) return;
    await clearEvents(user.id);
    setEventHistory([]);
  };

  return (
    <AppContext.Provider value={{
      dbReady,
      user,
      isLoggedIn,
      register,
      login,
      logout,
      settings,
      updateSettings,
      emergencyContacts,
      addEmergencyContact,
      removeEmergencyContact,
      eventHistory,
      addEvent,
      clearHistory,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
