const express = require('express');
const router = express.Router();
const CarController = require('../controllers/car_controller');
const LoginMiddleware = require('../middlewares/login_middleware');

router.use(LoginMiddleware);
router.post('/', CarController.create);
router.get('/', CarController.index);
router.get('/:id', CarController.details);
router.put('/:id', CarController.update);
router.delete('/:id', CarController.delete);
module.exports = router;