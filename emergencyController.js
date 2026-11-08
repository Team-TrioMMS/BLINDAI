const db = require('../config/db');

// Get all emergency contacts for current user
exports.getContacts = async (req, res) => {
  try {
    const contacts = await db.allAsync(
      'SELECT * FROM emergency_contacts WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json({ success: true, contacts });
  } catch (err) {
    console.error('getContacts error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch contacts.' });
  }
};

// Add new emergency contact
exports.addContact = async (req, res) => {
  try {
    const { name, phone, relationship } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ success: false, message: 'Name and phone are required.' });
    }

    const result = await db.runAsync(
      'INSERT INTO emergency_contacts (user_id, name, phone, relationship) VALUES (?, ?, ?, ?)',
      [req.user.id, name.trim(), phone.trim(), relationship || 'Family/Caregiver']
    );

    const contact = await db.getAsync('SELECT * FROM emergency_contacts WHERE id = ?', [result.lastID]);
    res.status(201).json({ success: true, contact });
  } catch (err) {
    console.error('addContact error:', err);
    res.status(500).json({ success: false, message: 'Failed to add contact.' });
  }
};

// Delete emergency contact
exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    await db.runAsync('DELETE FROM emergency_contacts WHERE id = ? AND user_id = ?', [id, req.user.id]);
    res.json({ success: true, message: 'Contact deleted successfully.' });
  } catch (err) {
    console.error('deleteContact error:', err);
    res.status(500).json({ success: false, message: 'Failed to delete contact.' });
  }
};

// Trigger Emergency Alert (FR-14)
// Broadcasts to emergency contacts and logs safety event
exports.triggerAlert = async (req, res) => {
  try {
    const { latitude, longitude, address } = req.body;
    const locationStr = (latitude && longitude)
      ? `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
      : (address || 'Current coordinates unavailable');

    // Fetch contacts
    const contacts = await db.allAsync(
      'SELECT name, phone FROM emergency_contacts WHERE user_id = ?',
      [req.user.id]
    );

    // Record emergency in safety_events
    const eventResult = await db.runAsync(
      'INSERT INTO safety_events (user_id, type, message, location) VALUES (?, ?, ?, ?)',
      [req.user.id, 'emergency', `EMERGENCY ALERT: User requested immediate assistance!`, locationStr]
    );

    // Simulated SMS / Push notification payload
    const alertDetails = {
      user: req.user.name,
      location: locationStr,
      googleMapsUrl: (latitude && longitude) ? `https://maps.google.com/?q=${latitude},${longitude}` : null,
      notifiedContacts: contacts.map(c => ({
        name: c.name,
        phone: c.phone,
        status: 'DISPATCHED_SMS'
      })),
      timestamp: new Date().toISOString()
    };

    console.log('🚨 [EMERGENCY DISPATCH]', JSON.stringify(alertDetails, null, 2));

    res.json({
      success: true,
      message: `Emergency alert dispatched to ${contacts.length} contact(s).`,
      alert: alertDetails
    });
  } catch (err) {
    console.error('triggerAlert error:', err);
    res.status(500).json({ success: false, message: 'Failed to broadcast emergency alert.' });
  }
};
