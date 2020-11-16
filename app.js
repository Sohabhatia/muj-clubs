const express = require("express");
const path = require("path");
const morgan = require("morgan");
const pug = require('pug');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');

const clubsRouter = require("./Routes/clubsRoute");
const userRouter = require('./Routes/userRoute');
//const reviewRouter = require('./Routes/reviewRoutes');
const viewRouter = require('./Routes/viewRoutes');

const app = express();


app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//GLOBAL MIDDLEWARES
//Static webpage
app.use(express.static(path.join(__dirname, "public")));

//Set environment to development
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Body parser
app.use(express.json({ limit: "10kb" }));
//cookie parser
app.use(cookieParser());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.cookies);
  next();
});

// Testing middleware
app.use((req, res, next) => {
  console.log("Hello from the middleware!");

  next();
});

//Mounting our new routers to app on a specified route
app.use("/", viewRouter);
app.use("/api/v1/clubs", clubsRouter);
app.use("/api/v1/users", userRouter);
//app.use("/api/v1/reviewa", reviewRouter);


app.all('*', (req, res, next) => {
  
  const err = new AppError(`Can't find ${req.originalUrl} on this server`, 404);
  next(err);
});

module.exports = app;
