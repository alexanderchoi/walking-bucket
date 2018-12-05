const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/keys')
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local');
// const passportLocalMongoose = require('passport-local-mongoose');
const User = require('./models/User');

const app = express();

// Use BodyParser
app.use(bodyParser.urlencoded({ extended: true }));

// Passport
app.use(passport.initialize());
app.use(passport.session());

app.use(session({
  secret: 'Rusty is the best',
  saveUninitialized: false,
  resave: false
}));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Connect to the Database
const db = keys.mongoURI
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log(`MongoDB connected...`))
  .catch(err => console.log(err));

// Routes
const items = require('./routes/api/items')
app.use('/api/items', items);

// Auth Routes
app.post('/register', function(req, res) {
  User.register(new User({ username: req.body.username }), req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      return res.render('/register');
    }
    passport.authenticate('local')(req, res, function() {
      res.redirect('/secret');
    })
  })
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/secret',
    failureRedirect: '/login'
  }), function(req, res) {
});

app.get('/logout', function(req, res) {
  req.logout();
  res.json({ success: false });
})

app.get('/secret', function(req, res) {
  res.json()
})

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next;
  }
  res.redirect('/login');
}




app.get('/users', function(req, res, next) {
  res.json([
    {
      id:1,
      username: "samsepi01"
    }, {
      id: 2,
      username: "D0loresH4ze"
    }
  ]);
});



// Port and Listen
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on ${port}...`));