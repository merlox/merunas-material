var passport = require('passport'),
User = require('../app/models/user.server.model.js');

module.exports = function(){
  //movido de sitio lo de arriba, puede dar errores
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
  require('./strategies/twitter.js')();
  require('./strategies/facebook.js')();
  require('./strategies/google.js')();
};
