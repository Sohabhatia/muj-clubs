const catchError = require('./../utils/catchError');
const AppError = require('./../utils/appError');
const Register = require('../Model/registerModel');
const Club = require('./../Model/clubModel');
const User = require('../Model/userModel');




exports.registerMe = catchError( async(req, res, next) => {
     
     const club = await Club.findOne({ name: req.body.data.ClubName});


    if(!req.body.data){
        const err = new AppError('Please provide information in registeration form!', 400);
        return next(err);
    }
    //console.log(req.user.registeration);
       if(req.user.registeration === undefined){
        const registeration = await Register.create({
        name: req.body.data.name,
        RegistrationNo: req.body.data.RegisterationNumber,
        clubs : club._id,
        Degree : req.body.data.Degree,
        Year : req.body.data.Year,
        Branch : req.body.data.Branch,
        ContactNumber : req.body.data.ContactNumber,
    });
    
     await User.findByIdAndUpdate(req.user._id, {
         registeration : registeration._id
     });
     
     
     
     res.status(201).json({
        status : 'success',
        message : 'Entry created'
    });

    }
    else {
        const registerationId = req.user.registeration;

        await Register.findByIdAndUpdate(registerationId, {
            $push: { clubs: club._id }
        })
        res.status(201).json({
            status : 'success',
            message : 'Entry added'
     
       });
    }
}); 

exports.getRegisterations = async( req, res , next) => {
    const clubName = req.params.id;
    const club = await Club.find( { name : clubName} );
  
    const registerations = await Register.find( {"clubs" : { $all : [club._id]}});
    console.log(registerations);
    next();
    
  }
