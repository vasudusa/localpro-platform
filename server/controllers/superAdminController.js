const db = require('../config/db');

async function listVendors(req, res) {
  const { rows } = await db.query('SELECT id, business_name AS name, subdomain, status, created_at FROM tenants ORDER BY created_at DESC');
  // convert status to a boolean field for frontend convenience
  res.json(rows.map(r => ({ ...r, is_active: r.status === 'active' })));
}

async function createVendor(req, res) {
  const { name, subdomain } = req.body;
  if (!name || !subdomain) return res.status(400).json({ error: 'Missing fields' });
  const { rows } = await db.query('INSERT INTO tenants (business_name, subdomain) VALUES ($1,$2) RETURNING *', [name, subdomain]);
  res.json(rows[0]);
}

async function suspendVendor(req, res) {
  const id = req.params.id;
  const { suspend } = req.body;
  const newStatus = suspend === true ? 'suspended' : 'active';
  const { rows } = await db.query('UPDATE tenants SET status = $1 WHERE id = $2 RETURNING *', [newStatus, id]);
  const tenant = rows[0];
  tenant.is_active = tenant.status === 'active';
  res.json(tenant);
}

async function listAllTransactions(req, res) {
  const { rows } = await db.query('SELECT * FROM transactions ORDER BY created_at DESC');
  res.json(rows);
}

module.exports = { listVendors, createVendor, suspendVendor, listAllTransactions };
