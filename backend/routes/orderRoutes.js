const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/add-order', orderController.addOrder);
router.post('/generate-bill', orderController.generateBill);
router.get('/sales', orderController.getSales); // Admin only

module.exports = router;
