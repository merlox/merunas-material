var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  findOrCreate = require('mongoose-findorcreate'),
  crypto = require('crypto'),
  UserSchema = new Schema({
  email: {
    type: String
  },
  username: {
    type: String,
    unique: true,
    required: 'Your name'
  },
  password: {
    type: String
  },
  phoneNumber: {
    type: Number,
    default: ''
  },
  salt: String,
  provider: {
    type: String
  },
  providerId: String,
  providerData: {},
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.plugin(findOrCreate);

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

UserSchema.set('toJSON', {
  getters: true,
  virtuals: true
});

module.exports = mongoose.model('User', UserSchema);
