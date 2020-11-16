const express = require("express");
const clubController = require("./../Controller/clubController");
const authenticationController = require('./../Controller/aunthenticationController');
const userController = require('./../Controller/userController');

const router = express.Router();

 router
   .route("/")
   .get(clubController.getAllClubs)
   .post(clubController.checkBody, authenticationController.protect, clubController.createClub);

  // router
  //   .route('/:id')
  //   .get(clubController.getClub)
 
  router.route('/:id').get(clubController.getRegisterations);
  
module.exports = router;
/*authenticationController.protect ,authenticationController.restrictRole('admin'),*/