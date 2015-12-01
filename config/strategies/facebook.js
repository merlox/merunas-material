var passport = require('passport'),
  FacebookStrategy = require('passport-facebook').Strategy,
  User = require('../../app/models/user.server.model.js'),
  config = require('../config.js');

module.exports = function(){
  passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackUrl,
  },
  function(token, tokenSecret, profile, done){
    User.findOrCreate({
      username: profile.displayName,
      provider: 'facebook',
      providerId: profile.id,
      providerData: profile._json
    }, function(err, userFound){
      if(err) return done(err);
      done(null, userFound);
    });
  }));
};
