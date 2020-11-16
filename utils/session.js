const Session = require("express-session");
require("dotenv").config();

const session = Session({
  name: "languify",
  resave: false,
  saveUninitialized: false,
  secret: "38cb6622-ae3d-11ea-b3de-0242ac130004",
  cookie: {
    maxAge: 1000 * 60 * 60, //1 hr
    sameSite: true,
    secure: false, //use true in production env
  },
});

module.exports = session;
