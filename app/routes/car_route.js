const express = require('express');
const router = express.Router();
const CarController = require('../controllers/car_controller');
router.get('/testar', CarController.test);
module.exports = router;