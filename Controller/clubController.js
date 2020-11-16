const Club = require("./../Model/clubModel");
const Register = require("./../Model/registerModel");

exports.checkBody = (req, res, next) => {
  if (req.body) return next();

  return res.status(400).json({
    status: "failure",
    message: "invalid request made!",
  });
};

exports.getAllClubs = async (req, res, next) => {
  const clubs = await Club.find();

  res.status(200).json({
    status: "success",
    requestTime: req.requestTime,
    data: {
      data: clubs,
    },
  });
  next();
};

exports.getClub = async ( req, res, next) => {

 try{
 const query = Club.findById(req.params.id).populate('reviews');
 
 const club = await query;

  res.status(200).json({
   status : 'success',
   data : club
 })
}catch(error){
  res.status(404).json({
    status : 'fail',
    message : error
  });

 }

}

exports.updateClub = async (req, res, next) => {
 
  try{
  const club = await Club.findByIdAndUpdate(req.params.id, req.body, {
    new : true,
    runValidators : true
  });
  
  res.status(200).json({
  status : 'success',
  data : club
});
  }catch(error){
    res.status(404).json({
      status : 'fail',
      message : error
    });
  }

}

exports.createClub = async (req, res, next) => {
  const club = await Club.create(req.body);

  res.status(201).json({
    status: "success",
    data:club
  });
};

exports.deleteClub = async (req, res , next) => {

  await Club.findByIdAndDelete(req.params);

  res.status(201).json({
    status: "success",
    data : null
  });

}

exports.getRegisterations = async( req, res , next) => {
  console.log(req.params);
  const clubName = req.params.id;
  const club = await Club.findById(clubName);
  
  const registerations = await Register.find( {"clubs" : { $all : [club._id]}});
  res.status(200).json({
    status : 'success',
    registerations
  })
  next();
  
}