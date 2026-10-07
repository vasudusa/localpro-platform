const { Tenant } = require('../models');

const tenantMiddleware = async (req, res, next) => {
  try {
    const hostname = req.hostname.split('.');
    const subdomain = hostname[0] === 'www' ? hostname[1] : hostname[0];
    
    const tenant = await Tenant.findOne({ where: { subdomain } });
    if (!tenant || tenant.status !== 'active') {
      return res.status(404).json({ error: 'Tenant not found or inactive' });
    }
    
    req.tenant = tenant;
    next();
  } catch (error) {
    res.status(500).json({ error: 'Tenant resolution failed' });
  }
};

module.exports = tenantMiddleware;
