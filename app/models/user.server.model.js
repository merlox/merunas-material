var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
  username: {
    type: String,
    required: 'Your name'
  },
  password: {
    type: String,
    required: 'You need a password'
  },
  phoneNumber: {
    type: Number,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('User', UserSchema);
