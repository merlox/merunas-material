var passport = require('passport'),
  FacebookStrategy = require('passport-facebook').Strategy,
  User = require('../../app/models/user.server.model.js'),
  config = require('../config.js');

module.exports = function(){
  passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL,
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
        user.provider = 'facebook';
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
