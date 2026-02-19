const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.get('/tables', bookingController.getTables);
router.post('/book-table', bookingController.bookTable);

module.exports = router;
