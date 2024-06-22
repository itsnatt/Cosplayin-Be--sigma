const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category');
const authenticateJWT = require('../middleware/auth');

router.get('/', authenticateJWT, categoryController.getAllCategories); // Protected route
router.get('/:id', authenticateJWT, categoryController.getCategoryById); // Protected route
router.post('/', authenticateJWT, categoryController.createCategory); // Protected route
router.put('/:id', authenticateJWT, categoryController.updateCategory); // Protected route
router.delete('/:id', authenticateJWT, categoryController.deleteCategory); // Protected route

module.exports = router;
