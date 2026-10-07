const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SALT_ROUNDS = 10;

async function registerVendor(req, res) {
  const { name, subdomain, adminName, adminEmail, adminPassword } = req.body;
  if (!name || !subdomain || !adminEmail || !adminPassword) return res.status(400).json({ error: 'Missing fields' });

  try {
    // create tenant
    const tenantRes = await db.query('INSERT INTO tenants (name, subdomain) VALUES ($1, $2) RETURNING id, subdomain', [name, subdomain]);
    const tenant = tenantRes.rows[0];

    const password_hash = await bcrypt.hash(adminPassword, SALT_ROUNDS);
    const userRes = await db.query(
      'INSERT INTO users (tenant_id, name, email, password_hash, role) VALUES ($1,$2,$3,$4,$5) RETURNING id, email, role',
      [tenant.id, adminName || name, adminEmail, password_hash, 'vendor_admin']
    );

    res.json({ message: 'Vendor registered', tenant: tenant, admin: userRes.rows[0] });
  } catch (err) {
    console.error('registerVendor', err);
    res.status(500).json({ error: 'Registration failed' });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing email or password' });

  try {
    const { rows } = await db.query('SELECT u.*, t.subdomain FROM users u JOIN tenants t ON u.tenant_id = t.id WHERE u.email = $1 LIMIT 1', [email]);
    const user = rows[0];
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const payload = { id: user.id, tenant_id: user.tenant_id, role: user.role, email: user.email, subdomain: user.subdomain };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
    res.json({ token, user: payload });
  } catch (err) {
    console.error('login', err);
    res.status(500).json({ error: 'Login failed' });
  }
}

module.exports = { registerVendor, login };
