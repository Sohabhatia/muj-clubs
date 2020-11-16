const express = require("express");
const viewController = require("./../Controller/viewController");
const authenticationController = require('./../Controller/aunthenticationController');

const router = express.Router();



router.route('/').get(authenticationController.isLoggedIn,viewController.getHome);
router.route('/login').get(viewController.getLogin);
router.route('/register').get(authenticationController.protect,viewController.getRegistration);
router.route('/clubs').get(authenticationController.isLoggedIn,viewController.getClubs);
router.route('/club/:name').get(authenticationController.isLoggedIn,viewController.getAClub);
router.route('/myClubs').get(authenticationController.protect , viewController.getMyClub);
router.route('/admin/:name').get(authenticationController.protect, authenticationController.restrictRole('admin'),viewController.getAdminRegisterations);




  module.exports = router;
