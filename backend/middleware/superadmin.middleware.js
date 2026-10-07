const { roleMiddleware } = require('./auth.middleware');

const superadminMiddleware = roleMiddleware(['super_admin']);
module.exports = superadminMiddleware;
