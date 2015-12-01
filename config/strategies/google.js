var passport = require('passport'),
  GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
  config = require('../config.js'),
  User = require('../../app/models/user.server.model.js');

module.exports = function(){
  passport.use(new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackUrl,
  },
  function(token, tokenSecret, profile, done){
    User.findOrCreate({
      username: profile.displayName,
      provider: 'google',
      providerId: profile.id,
      providerData: profile._json
    }, function(err, userFound){
      if(err) return done(err);
      done(null, userFound);
    });
  }));
};
