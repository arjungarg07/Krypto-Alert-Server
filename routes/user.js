const router = require('express').Router();

const alertController = require('../controllers/alertController');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

router.post('/signup',authController.signUpUser.bind(authController));
router.get('/login',authController.login.bind(authController));
router.get('/signup/validate/',authController.verifyUser.bind(authController));

router.get('/:username',authController.verifyToken,userController.data);
router.get('/:username/alert',authController.verifyToken,alertController.createAlert.bind(alertController));

module.exports = router;