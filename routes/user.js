const router = require('express').Router();
const authController = require('../controllers/authController');

router.post('/signup',authController.signUpUser.bind(authController));
router.get('/login',authController.login.bind(authController));

module.exports = router;