const localStrategy = require('passport-local').Strategy;
const User = require('./models/User');

module.exports = function (passport) {
  passport.serializeUser(function(user, done) {
    done(null, user)
  })

  passport.deserializeUser(function(user, done) {
    done(null, user)
  })

  passport.use(new localStrategy(function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (user) {
        var valid = user.comparePassword(password, user.password)
        if (valid) {
          done(null, {
            username: user.username,
            password: user.password
          })
        } else {
          done(null, false);
        }
      } else {
        done(null, false);
      }
    })
  }))
}