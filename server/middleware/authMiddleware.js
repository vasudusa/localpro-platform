const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Missing Authorization header' });
  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Malformed Authorization header' });

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    req.user = payload;
    next();
  });
}

function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !req.user.role) return res.status(403).json({ error: 'Missing user role' });
    if (!allowedRoles.includes(req.user.role)) return res.status(403).json({ error: 'Forbidden' });
    next();
  };
}

module.exports = { authenticate, authorizeRoles };
