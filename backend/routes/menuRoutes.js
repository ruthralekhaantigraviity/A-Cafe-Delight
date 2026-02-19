const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

router.get('/menu', menuController.getMenu);
router.post('/menu', menuController.addMenuItem); // Admin only, but simplified for now
router.delete('/menu/:id', menuController.deleteMenuItem); // Admin only

module.exports = router;
