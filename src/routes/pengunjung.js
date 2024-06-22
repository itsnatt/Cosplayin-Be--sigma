const express = require('express');
const router = express.Router();
const pengunjungController = require('../controllers/pengunjung');
const authenticateJWT = require('../middleware/auth');

router.get('/', authenticateJWT, pengunjungController.getAllPengunjung); // Protected route
router.get('/:id', authenticateJWT, pengunjungController.getPengunjungById); // Protected route
router.post('/', authenticateJWT, pengunjungController.createPengunjung); // Protected route
router.put('/:id', authenticateJWT, pengunjungController.updatePengunjung); // Protected route
router.delete('/:id', authenticateJWT, pengunjungController.deletePengunjung); // Protected route

module.exports = router;
