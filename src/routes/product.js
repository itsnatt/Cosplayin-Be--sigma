const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');
const authenticateJWT = require('../middleware/auth');

router.get('/', authenticateJWT, productController.getAllProducts); // Protected route
router.get('/:id', authenticateJWT, productController.getProductById); // Protected route
router.post('/', authenticateJWT, productController.createProduct); // Protected route
router.put('/:id', authenticateJWT, productController.updateProduct); // Protected route
router.delete('/:id', authenticateJWT, productController.deleteProduct); // Protected route

module.exports = router;
