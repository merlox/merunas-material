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
    User.findOrCreate({
      username: profile.displayName,
      provider: 'twitter',
      providerId: profile.id,
      providerData: profile._json
    }, function(err, userFound){
      if(err) return done(err);
      done(null, userFound);
    });
  }));
};
