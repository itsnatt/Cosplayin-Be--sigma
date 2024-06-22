const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const authenticateJWT = require('../middleware/auth');

router.post('/register', adminController.registerAdmin); // Public route
router.post('/login', adminController.loginAdmin); // Public route
router.get('/profile', authenticateJWT, adminController.getAdminProfile); // Protected route

module.exports = router;
