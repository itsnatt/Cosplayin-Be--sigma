const express = require('express');
const router = express.Router();
const statusController = require('../controllers/status');
const authenticateJWT = require('../middleware/auth');

router.get('/', authenticateJWT, statusController.getAllStatuses); // Protected route
router.get('/:id', authenticateJWT, statusController.getStatusById); // Protected route
router.post('/', authenticateJWT, statusController.createStatus); // Protected route
router.put('/:id', authenticateJWT, statusController.updateStatus); // Protected route
router.delete('/:id', authenticateJWT, statusController.deleteStatus); // Protected route

module.exports = router;
