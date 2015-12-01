var User = require('../models/user.server.model.js');

exports.signup = function(req, res){
  var configPassport = require('../../config/passport.js')();
  if(!req.user){
    var user = new User(req.body);
    user.provider = 'local';
    user.save(function(err){
      if(err) {
        console.log(err);
        return res.redirect('/signup');
      }
      req.login(user, function(err){
        if(err) return next(err);
        return res.json({message:'Redirecting to /home'});
      });
    });
  }else{
    return res.json({message:'Redirecting to /home'});
  }
};
exports.signout = function(req, res){
  req.logout();
  res.json({message: 'Redirecting to /signin'});
};
