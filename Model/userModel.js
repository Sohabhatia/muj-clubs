const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const Register = require('./../Model/registerModel');


const userSchema = new mongoose.Schema({
  //SCHEMA FOR ADMINS
  name: {
    type: String,
    required: [true, 'A name is required!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email!'],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email!',
    },
  },
  role : {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  club : {
    type: String
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
    password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please confirm your password!'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Password confirmation wrong!',
    },
  },
  registeration : {
    type : mongoose.Schema.ObjectId,
    ref : 'Register',
  }
  
  
});

//encrypting our password
 userSchema.pre('save', async function (next) {
    //ONLY ENCRYPT WHEN PASSWORD IS SAVED OR MODIFIED
  if (!this.isModified('password')) return next();

  //ENCRYPT PASSWORD OF CURRENT DOCUMENT
  this.password = await bcrypt.hash(this.password, 12);

  // DELETE PASSWORD FIELD FROM DATABASE
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  userPassword,
  candidatePassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};





const User = mongoose.model('User', userSchema);

module.exports = User;
