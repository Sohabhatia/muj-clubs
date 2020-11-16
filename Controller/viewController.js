const Register = require('../Model/registerModel');
const Club = require('./../Model/clubModel');

exports.getHome = async(req, res, next) => {
 
    const clubs = await Club.find();

    res.status(200).render('home',{
        Title : 'MUJ Clubs',
        clubs : clubs,
    });
};

exports.getLogin = async (req, res, next) => {
  
    res.status(200).render('login', {
      Title: 'Log into your account',
    });
  };


exports.getRegistration = async (req, res, next) => {
   
    const clubs = await Club.find();

    res.status(200).render('register', {
      Title: 'Register into clubs',
      clubs : clubs
    });
  };
  
exports.getClubs = async(req, res, next) => {

  const clubs = await Club.find({});

  res.status(200).render('Clubs',{

    Title : 'All Clubs',
    clubs : clubs
  });

}

exports.getAClub = async(req, res, next) => {
 console.log(req.params);
  const club = await Club.findOne({ name: req.params.name });
  console.log(club);

  res.status(200).render('mainClub',{

    Title : `${club.name}`,
    club : club
  });

}

exports.getMyClub = async(req, res, next) => {

   const registerationId = req.user.registeration;

   const registeration = await Register.findById(registerationId);
   const club_id = registeration.clubs;
   const clubs = await Club.find({_id : club_id });
   console.log(clubs);
  


  res.status(200).render('myClubs', {
    Title: 'My clubs',
    clubs
  });
}

exports.getAdminRegisterations =async ( req, res, next ) => {
  
  
  const clubName = req.params.name;
  const club = await Club.findOne( {name : clubName});
  console.log(club);
  const registerations = await Register.find( {"clubs" : { $all : [club._id]}});
  console.log(registerations);
  res.status(200).render('Admin' , {
    Title : 'My admins',
    registerations,
    club
  });
}