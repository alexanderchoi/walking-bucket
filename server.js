const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/keys')
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const User = require('./models/User');
const path = require('path');

const app = express();

// Use BodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// Passport
app.use(session({
  secret: 'secretySecret',
  saveUninitialized: false,
  resave: false
}));

app.use(passport.initialize());
app.use(passport.session());

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
const logs = require('./routes/api/logs')
app.use('/api/logs', logs);

// Auth Routes
app.post('/register', function(req, res) {
  var body = req.body,
             username = body.username,
             password = body.password;
  User.findOne({ username: username }, function(err, document) {
    if (err) { res.status(500).send('Error ocurred') }
    else {
      if (document) {
        { res.status(500).send('Username already exists.') }
      } else {
        User.register(new User({ username: req.body.username }), req.body.password, function(err, user) {
          if(err) {
            console.log(err);
          }
          return res.redirect('/login');
        })
      }
    }
  })
})

app.post('/login', passport.authenticate('local', {
  failureRedirect: '/login',
  successRedirect: '/secret'
}), function(req, res) {
  res.send('hey');
});

// API Routes
app.get('/api/logout', function(req, res) {
  req.logout();
  res.json({ message: 'true facts' });
})

app.get('/api/secret', function(req, res) {
  if (req.isAuthenticated()) {
    res.json({ isLoggedIn: 'true' })
  } else {
    res.json({ isLoggedIn: 'false' })
  }
})

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

// Port and Listen
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on ${port}...`));