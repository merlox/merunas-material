var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var UserSchema = new Schema({
  email: {
    type: String,
    match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]
  },
  username: {
    type: String,
    unique: true,
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
  salt: String,
  provider: {
    type: String,
    required: 'Provider required'
  },
  providerId: String,
  providerData: {},
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', function(next){
  if(this.password){
    this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
    this.password = this.hashPassword(this.password);
  }
  next();
});

UserSchema.methods.hashPassword = function(password){
  return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

UserSchema.methods.authenticate = function(password){
  return this.password === this.hashPassword(password);
};

UserSchema.statics.findUniqueUsername = function(username, suffix, callback){
  var _this = this;
  var possibleUsername = username + (suffix || '');
  _this.findOne({
    username: possibleUsername
  }, function(err, user){
    if(!err){
      if(!user){
        callback(possibleUsername);
      }else{
        return _this.findUniqueUsername(username, (suffix || 0)+1, callback);
      }
    }else{
      callback(null);
    }
  });
};

UserSchema.set('toJSON', {
  getters: true,
  virtuals: true
});

module.exports = mongoose.model('User', UserSchema);
