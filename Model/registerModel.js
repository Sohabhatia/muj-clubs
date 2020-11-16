const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');


const registerSchema = new mongoose.Schema({
  //SCHEMA FOR Registrations
  name: {
    type: String,
    required: [true, 'A name is required!'],
  },
  
  RegistrationNo : {
    type: Number,
    required: [true, 'Please provide a registration no.!'],
    unique : true
    
  },
  Degree: {
    type: String,
    enum: ['btech','Non-B.Tech']
  },
  Year: {
    type: String,
    required: [true, 'Please provide some year'],
    
  },
  Branch: {
    type: String,
  },
  clubs: [{
    type : mongoose.Schema.ObjectId,
    required : [true, 'A club name is required'],
    ref : 'Club'
  }],
  ContactNumber : {
    type : Number,
    required : [true, 'A phone no is required'],
    maxlength : 10,
    minlength : 10
   },
   
  
  
});
  

// registerSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'clubs',
//     select: 'name summary',
//   });
//   next();
// });



const Register = mongoose.model('Register', registerSchema);

module.exports = Register;
