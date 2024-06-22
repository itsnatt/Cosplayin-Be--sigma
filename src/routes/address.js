const express = require('express');
const router = express.Router();
const addressController = require('../controllers/address');
const authenticateJWT = require('../middleware/auth'); // Import the JWT authentication middleware

router.get('/', authenticateJWT, addressController.getAllAddresses); // Protected route
router.get('/:id', authenticateJWT, addressController.getAddressById); // Protected route
router.post('/', authenticateJWT, addressController.createAddress); // Protected route
router.put('/:id', authenticateJWT, addressController.updateAddress); // Protected route
router.delete('/:id', authenticateJWT, addressController.deleteAddress); // Protected route

module.exports = router;
