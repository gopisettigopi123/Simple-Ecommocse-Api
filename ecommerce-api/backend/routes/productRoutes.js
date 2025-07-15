const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

// Public route
router.get('/', productController.getProducts);

// Admin routes
router.post('/', auth, role('admin'), productController.addProduct);
router.put('/:id', auth, role('admin'), productController.updateProduct);
router.delete('/:id', auth, role('admin'), productController.deleteProduct);

module.exports = router;
