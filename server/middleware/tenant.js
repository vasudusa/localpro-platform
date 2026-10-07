
const pool = require("../config/db");

module.exports = async function (req, res, next) {
  const host = req.headers.host || "";
  // grab portion before first dot
  let subdomain = host.split(".")[0];

  // if running on localhost (or no dot in host) we may want a default tenant
  if (subdomain === "www" || subdomain === "localhost" || !host.includes('.')) {
    const defaultSub = process.env.DEFAULT_TENANT_SUBDOMAIN || "demo";
    try {
      const result = await pool.query(
        "SELECT id, business_name AS name, subdomain, status FROM tenants WHERE subdomain=$1 LIMIT 1",
        [defaultSub]
      );
      if (result.rows.length) {
        const t = result.rows[0];
        t.is_active = t.status === 'active';
        req.tenant = t;
      }
    } catch (err) {
      return next(err);
    }
    return next();
  }

  try {
    const result = await pool.query(
      'SELECT id, business_name AS name, subdomain, status FROM tenants WHERE subdomain = $1 LIMIT 1',
      [subdomain]
    );

    if (!result.rows.length)
      return res.status(404).json({ message: "Tenant not found" });

    const t = result.rows[0];
    t.is_active = t.status === 'active';
    req.tenant = t;
    next();
  } catch (err) {
    next(err);
  }
};
