const router = require('express').Router();

const alertController = require('../controllers/alertController');
const authController = require('../controllers/authController');
const currencyController = require('../controllers/currencyController');
const userController = require('../controllers/userController');

router.post('/signup',authController.signUpUser.bind(authController));
router.post('/login',authController.login.bind(authController));
router.get('/signup/validate',authController.verifyUser.bind(authController));
router.get('/session/valid',authController.checkSession.bind(authController));
router.get('/logout',authController.logout.bind(authController));

router.get('/data/all',currencyController.getAll);
router.get('/data/top',currencyController.getTop);

router.get('/user/:username',authController.verifyToken,userController.data);
router.post('/:username/alert',authController.verifyToken,alertController.createAlert.bind(alertController));
router.put('/:username/alert',authController.verifyToken,alertController.deleteAlert.bind(alertController));

module.exports = router;