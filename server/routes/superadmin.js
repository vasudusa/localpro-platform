const express = require('express');
const router = express.Router();
const { authenticate, authorizeRoles } = require('../middleware/auth');
const superAdminController = require('../controllers/superAdminController');

// Super admin routes
router.use(authenticate);
router.use(authorizeRoles('super_admin'));

router.get('/vendors', superAdminController.listVendors);
router.post('/vendors', superAdminController.createVendor);
router.put('/vendors/:id/suspend', superAdminController.suspendVendor);
router.get('/transactions', superAdminController.listAllTransactions);

module.exports = router;
