var passport = require('passport'),
  GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
  config = require('../config.js'),
  User = require('../../app/models/user.server.model.js');

module.exports = function(){
  passport.use(new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL,
  },
  function(token, tokenSecret, profile, done){
    User.findOne({
      username: profile.displayName,
    }, function(err, userFound){
      if(userFound){
        console.log('user found');
      }
      if(err) return done(err);
      if(!userFound){
        var user = new User();
        user.username = profile.displayName;
        user.provider = 'google';
        user.providerId = profile.id;
        user.providerData = profile._json;
        user.save(function(err){
          if(err) return done(err);
          return done(null, user);
        });
      }else{
        return done(null, userFound);
      }
    });
  }));
};
