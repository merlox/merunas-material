module.exports = function(){
  var passport = require('passport');
  var User = require('../app/models/user.server.model.js');
  passport.serializeUser(function(user, done){
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done){
    User.findOne({
      _id: id
    }, '-password -salt', function(err, user){
      done(err, user);
    });
  });
  require('./strategies/local.js')();
};
