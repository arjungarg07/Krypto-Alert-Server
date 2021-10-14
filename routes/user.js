const router = require('express').Router();

const alertController = require('../controllers/alertController');
const authController = require('../controllers/authController');
const currencyController = require('../controllers/currencyController');
const userController = require('../controllers/userController');

router.post('/signup',authController.signUpUser.bind(authController));
router.get('/login',authController.login.bind(authController));
router.get('/signup/validate/',authController.verifyUser.bind(authController));

router.get('/data/all',currencyController.getAll);
router.get('/data/top',currencyController.getTop);

router.get('/:username',authController.verifyToken,userController.data);
router.post('/:username/alert',authController.verifyToken,alertController.createAlert.bind(alertController));
router.put('/:username/alert',authController.verifyToken,alertController.deleteAlert.bind(alertController));

module.exports = router;