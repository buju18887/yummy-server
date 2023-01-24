const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt')

// Load User model
const {User} = require('../database/database');
const { forwardAuthenticated } = require('../configs/auth');

// Login Page
router.get('/login', (req, res) => res.render('login'));

// Signup Page
router.get('/signup', (req, res) => res.render('signup'));

// signup
router.post('/signup', (req, res) => {

    const { f_name, l_name, email, password, password2, age, country } = req.body;
    let errors = []

    if (!f_name || !l_name || !email || !password || !password2 || !age || !country) {
      errors.push({ msg: 'Please enter all fields' });
    }
  
    if (password != password2) {
      errors.push({ msg: 'Passwords do not match' });
    }
  
    if (password.length < 6) {
      errors.push({ msg: 'Password must be at least 6 characters' });
    }
  
    if(f_name && l_name && email && password && password2 && age && country) {
        try {
          User.create({
            f_name: `${f_name}`,
            l_name: `${l_name}`,
            email: `${email}`,
            password: `${password}`,
            password2: `${password2}`,
            age: `${age}`,
            country: `${country}`
          });
          res.redirect('/users/login')
        }
        catch (err) {
            console.log(err);
        }
    }
});  
         
  // Login
  router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
  });
  
  // Logout
  router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
  });
  
  module.exports = router;

  