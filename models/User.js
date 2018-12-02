// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt-nodejs');

// const UserSchema = new Schema({
//   username: {
//     type: String,
//     required: true
//   },
//   password: {
//     type: String,
//     required: true
//   }
// });

// UserSchema.methods.hashPassword = function (password) {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
// }

// UserSchema.methods.comparePassword = function (password, hash) {
//   return bcrypt.compareSync(password, hash)
// }

// module.exports = User = mongoose.model('users', UserSchema, 'users');

const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    // required: true
  },
  password: {
    type: String,
    // required: true
  }
});

UserSchema.plugin(passportLocalMongoose);

UserSchema.methods.hashPassword = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

UserSchema.methods.comparePassword = function (password, hash) {
  return bcrypt.compareSync(password, hash)
}

module.exports = User = mongoose.model('User', UserSchema);