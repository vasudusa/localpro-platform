const express = require('express');
const router = express.Router();
const { authenticate, authorizeRoles } = require('../middleware/auth');
const vendorController = require('../controllers/vendorController');

// Protect all vendor routes
router.use(authenticate);
router.get('/offerings', authorizeRoles('vendor_admin','vendor_staff'), vendorController.listOfferings);
router.post('/offerings', authorizeRoles('vendor_admin'), vendorController.createOffering);
router.put('/offerings/:id', authorizeRoles('vendor_admin'), vendorController.updateOffering);
router.delete('/offerings/:id', authorizeRoles('vendor_admin'), vendorController.deleteOffering);

// Appointments
router.get('/appointments', authorizeRoles('vendor_admin','vendor_staff'), vendorController.listAppointments);
router.post('/appointments/book', vendorController.bookAppointment);
router.put('/appointments/:id/status', authorizeRoles('vendor_admin','vendor_staff'), vendorController.updateAppointmentStatus);

// Transactions and settings
router.get('/transactions', authorizeRoles('vendor_admin','vendor_staff'), vendorController.listTransactions);
router.put('/settings', authorizeRoles('vendor_admin'), vendorController.updateSettings);

module.exports = router;
