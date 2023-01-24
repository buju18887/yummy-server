const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

// Passport Config
require('./configs/passport')(passport);

//ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');

//body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

//session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );
  
  // Passport 
  app.use(passport.initialize());
  app.use(passport.session());
  
  // flash
  app.use(flash());
  
  // Global variables
  app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });

  //routes
app.use('/users', require('./routes/users'));


const PORT = process.env.PORT || 5300;

app.listen(PORT, console.log(`Server running on  ${PORT}`));
