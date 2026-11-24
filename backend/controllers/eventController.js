const db = require('../config/db');

// Record a new safety / navigation event
exports.createEvent = async (req, res) => {
  try {
    const { type, message, location } = req.body;
    if (!type || !message) {
      return res.status(400).json({ success: false, message: 'Type and message are required.' });
    }

    const result = await db.runAsync(
      'INSERT INTO safety_events (user_id, type, message, location) VALUES (?, ?, ?, ?)',
      [req.user.id, type, message, location || null]
    );

    const event = await db.getAsync('SELECT * FROM safety_events WHERE id = ?', [result.lastID]);
    res.status(201).json({ success: true, event });
  } catch (err) {
    console.error('createEvent error:', err);
    res.status(500).json({ success: false, message: 'Failed to record event.' });
  }
};

// Get safety event history
exports.getEvents = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const events = await db.allAsync(
      'SELECT * FROM safety_events WHERE user_id = ? ORDER BY created_at DESC LIMIT ?',
      [req.user.id, limit]
    );
    res.json({ success: true, count: events.length, events });
  } catch (err) {
    console.error('getEvents error:', err);
    res.status(500).json({ success: false, message: 'Failed to retrieve events.' });
  }
};

// Clear safety events
exports.clearEvents = async (req, res) => {
  try {
    await db.runAsync('DELETE FROM safety_events WHERE user_id = ?', [req.user.id]);
    res.json({ success: true, message: 'Event history cleared successfully.' });
  } catch (err) {
    console.error('clearEvents error:', err);
    res.status(500).json({ success: false, message: 'Failed to clear events.' });
  }
};
