const db = require('../config/db');

// Offerings
async function listOfferings(req, res) {
  const tenantId = req.tenant && req.tenant.id;
  if (!tenantId) return res.status(400).json({ error: 'Tenant not resolved' });
  const { rows } = await db.query('SELECT * FROM offerings WHERE tenant_id = $1 ORDER BY id DESC', [tenantId]);
  res.json(rows);
}

async function createOffering(req, res) {
  const tenantId = req.tenant.id;
  const { title, description, price, duration_minutes } = req.body;
  const { rows } = await db.query(
    'INSERT INTO offerings (tenant_id, title, description, price, duration_minutes) VALUES ($1,$2,$3,$4,$5) RETURNING *',
    [tenantId, title, description, price || 0, duration_minutes || 30]
  );
  res.json(rows[0]);
}

async function updateOffering(req, res) {
  const tenantId = req.tenant.id;
  const id = req.params.id;
  const { title, description, price, duration_minutes } = req.body;
  const { rows } = await db.query(
    'UPDATE offerings SET title=$1, description=$2, price=$3, duration_minutes=$4 WHERE id=$5 AND tenant_id=$6 RETURNING *',
    [title, description, price, duration_minutes, id, tenantId]
  );
  res.json(rows[0]);
}

async function deleteOffering(req, res) {
  const tenantId = req.tenant.id;
  const id = req.params.id;
  await db.query('DELETE FROM offerings WHERE id=$1 AND tenant_id=$2', [id, tenantId]);
  res.json({ message: 'Deleted' });
}

// Appointments
async function listAppointments(req, res) {
  const tenantId = req.tenant.id;
  const { rows } = await db.query('SELECT * FROM appointments WHERE tenant_id=$1 ORDER BY start_at DESC', [tenantId]);
  res.json(rows);
}

async function bookAppointment(req, res) {
  const tenantId = req.tenant && req.tenant.id;
  if (!tenantId) return res.status(400).json({ error: 'Tenant not resolved' });
  const { offering_id, customer_name, customer_contact, start_at, end_at } = req.body;
  const { rows } = await db.query(
    'INSERT INTO appointments (tenant_id, offering_id, customer_name, customer_contact, start_at, end_at, status) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
    [tenantId, offering_id, customer_name, customer_contact, start_at, end_at, 'pending']
  );
  res.json(rows[0]);
}

async function updateAppointmentStatus(req, res) {
  const tenantId = req.tenant.id;
  const id = req.params.id;
  const { status } = req.body;
  const { rows } = await db.query('UPDATE appointments SET status=$1 WHERE id=$2 AND tenant_id=$3 RETURNING *', [status, id, tenantId]);
  res.json(rows[0]);
}

// Transactions
async function listTransactions(req, res) {
  const tenantId = req.tenant.id;
  const { rows } = await db.query('SELECT * FROM transactions WHERE tenant_id=$1 ORDER BY created_at DESC', [tenantId]);
  res.json(rows);
}

// Settings
async function updateSettings(req, res) {
  const tenantId = req.tenant.id;
  const { whatsapp_number, theme, working_hours, slot_duration_minutes } = req.body;
  const { rows } = await db.query(
    `INSERT INTO vendor_settings (tenant_id, whatsapp_number, theme, working_hours, slot_duration_minutes)
      VALUES ($1,$2,$3,$4,$5)
      ON CONFLICT (tenant_id) DO UPDATE SET whatsapp_number = EXCLUDED.whatsapp_number, theme = EXCLUDED.theme, working_hours = EXCLUDED.working_hours, slot_duration_minutes = EXCLUDED.slot_duration_minutes
      RETURNING *`,
    [tenantId, whatsapp_number || null, theme || {}, working_hours || {}, slot_duration_minutes || 30]
  );
  res.json(rows[0]);
}

// WhatsApp link generator
function generateWhatsAppLink(number, message) {
  const encoded = encodeURIComponent(message || 'Hello');
  const cleaned = (number || '').replace(/[^+0-9]/g, '');
  return `https://wa.me/${cleaned}?text=${encoded}`;
}

module.exports = {
  listOfferings,
  createOffering,
  updateOffering,
  deleteOffering,
  listAppointments,
  bookAppointment,
  updateAppointmentStatus,
  listTransactions,
  updateSettings,
  generateWhatsAppLink
};
