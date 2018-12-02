const express = require('express');
const router = express.Router();
const User = require('../../models/User');

module.exports = function (passport) {
  router.post('/signup', function(req, res) {
    var body = req.body,
               username = body.username,
               password = body.password;
    User.findOne({ username: username }, function(err, document) {
      if (err) { res.status(500).send('Error ocurred') }
      else {
        if (document) {
          { res.status(500).send('Username already exists.') }
        } else {
          var record = new User()
            record.username = username;
            record.password = record.hashPassword(password)
            record.save(function(err, user) {
              if (err) {
                res.status(500).send('db error')
              } else {
                res.redirect('/login');
              }
            })
        }
      }
    })
  })
  
  router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/profile'
  }), function(req, res) {
    res.send('hey');
  })

  return router;
};