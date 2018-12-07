const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogSchema = new Schema({
  shotType: {
    type: String,
    // required: true
  },
  makes: {
    type: Number
  },
  attempts: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Log = mongoose.model('log', LogSchema);