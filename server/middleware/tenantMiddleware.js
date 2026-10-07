const db = require('../config/db');

/**
 * Extracts tenant from subdomain.
 * Expects Host header like "tenant.example.com".
 * If no subdomain found, treats it as super-admin context (no tenant attached).
 */
module.exports = async function tenantMiddleware(req, res, next) {
  try {
    const host = (req.headers.host || '').split(':')[0];
    const parts = host.split('.');
    let subdomain = null;

    // If host looks like subdomain.domain.tld -> parts.length >=3
    if (parts.length >= 3) {
      subdomain = parts[0];
    }

    if (!subdomain) {
      // No tenant subdomain - allow but no tenant context
      req.tenant = null;
      return next();
    }

    // Fetch tenant by subdomain
    const { rows } = await db.query('SELECT id, business_name AS name, subdomain, is_active FROM tenants WHERE subdomain = $1 LIMIT 1', [subdomain]);
    const tenant = rows[0];

    if (!tenant) {
      return res.status(404).json({ error: 'Tenant not found for subdomain' });
    }

    if (!tenant.is_active) {
      return res.status(403).json({ error: 'Tenant is suspended' });
    }

    req.tenant = tenant;
    next();
  } catch (err) {
    console.error('tenantMiddleware error', err);
    res.status(500).json({ error: 'Tenant resolution failed' });
  }
};
