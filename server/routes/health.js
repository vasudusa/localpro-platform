const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/ping', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT now()');
    res.json({ ok: true, time: rows[0].now });
  } catch (err) {
    console.error('DB ping failed', err);
    res.status(500).json({ ok: false, error: 'DB connection failed' });
  }
});

module.exports = router;
