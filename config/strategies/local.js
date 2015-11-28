var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

module.exports = function(){
  var User = require('../../app/models/user.server.model.js');
  passport.use(new LocalStrategy(function(username, password, done){
    User.findOne({username: username}, function(err, user){
      console.log(user)
      if(err) return done(err);
      if(!user){
        return done(null, false, {message: 'Unknown user'});
      }
      if(!user.authenticate(password)){
        return done(null, false, {message: 'Invalid password'});
      }
      return done(null, user);
    });
  }));
};
