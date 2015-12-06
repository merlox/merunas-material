var passport = require('passport'),
  TwitterStrategy = require('passport-twitter').Strategy,
  config = require('../config.js'),
  User = require('../../app/models/user.server.model.js');

module.exports = function(){
  passport.use(new TwitterStrategy({
    consumerKey: config.twitter.consumerKey,
    consumerSecret: config.twitter.consumerSecret,
    callbackURL: config.twitter.callbackURL,
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
        user.provider = 'twitter';
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
