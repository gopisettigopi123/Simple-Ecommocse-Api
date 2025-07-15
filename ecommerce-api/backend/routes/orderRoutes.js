const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

router.use(auth, role('customer'));

router.post('/', orderController.createOrder);
router.get('/', orderController.getOrders);

module.exports = router;
