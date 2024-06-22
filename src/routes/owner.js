const express = require('express');
const router = express.Router();
const ownerController = require('../controllers/owner');
const authenticateJWT = require('../middleware/auth');

router.get('/', authenticateJWT, ownerController.getAllOwners); // Protected route
router.get('/:id', authenticateJWT, ownerController.getOwnerById); // Protected route
router.post('/', authenticateJWT, ownerController.createOwner); // Protected route
router.put('/:id', authenticateJWT, ownerController.updateOwner); // Protected route
router.delete('/:id', authenticateJWT, ownerController.deleteOwner); // Protected route

module.exports = router;
