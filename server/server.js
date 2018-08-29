const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const morgan = require('morgan');
const session = require('express-session');
// const dbConnection = require('./database') 
// const MongoStore = require('connect-mongo')(session)
const passport = require('./passport');
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//Sessions
app.use(
  session({
  secret: 'taco-tuesday', //pick a random string to make the hash that is generated secure
  // store: new MongoStore({ mongooseConnection: dbConnection }),
  resave: false, //required
  saveUninitialized: false //required
  })
);

// Passport
app.use(passport.initialize())
app.use(passport.session()) // calls serializeUser and deserializeUser


// Displays the session info
app.use( (req, res, next) => {
  console.log('req.session', req.session);
  return next();
});

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/gourmandDB", { useNewUrlParser: true });

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
