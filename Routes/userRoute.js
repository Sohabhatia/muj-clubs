const express = require('express');
const userController = require('./../Controller/userController');
const authenticationController = require('./../Controller/aunthenticationController');

const router = express.Router();

router.post('/register' ,authenticationController.isLoggedIn, userController.registerMe);
router.post('/signup', authenticationController.signup);
router.post('/login', authenticationController.login);
router.get('/logout', authenticationController.logout);



module.exports = router;
