const LocalStrategy = require('passport-local').Strategy;
// const bcrypt = require('bcrypt');

// Load User model
const User= require('../database/database').User;

module.exports = function(passport) {
 
  passport.use(new LocalStrategy(
    function(email, password, done) {
      User.findOne({ where: { email: email } })
        .then(user => {
          if (!user) {
            return done(null, false, { message: 'Incorrect email.' });
          }
          if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
        })
        .catch(err => done(err));
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findByPk(id)
      .then(user => {
        done(null, user);
      })
      .catch(err => done(err));
  });
  
};
