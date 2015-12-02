var users = require('../controllers/users.server.controller.js'),
  passport = require('passport'),
  configPassport = require('../../config/passport.js')();

module.exports = function(app){
  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/auth/twitter', passport.authenticate('twitter'));
  app.get('/auth/twitter/callback', passport.authenticate('twitter'), function(req, res){
    res.redirect('/?username='+req.user.username);
  });

  app.get('/auth/facebook/', passport.authenticate('facebook'));
  app.get('/auth/facebook/callback', passport.authenticate('facebook'), function(req, res){
    res.redirect('/?username='+req.user.username);
  });

  app.get('/auth/google', passport.authenticate('google', {scope: 'https://www.googleapis.com/auth/plus.login'}));
  app.get('/auth/google/callback', passport.authenticate('google'), function(req, res){
    res.redirect('/?username='+req.user.username);
  });

  app.post('/signup', users.signup);

  app.post('/signin', passport.authenticate('local'), function(req, res){
    res.json({message: 'logged successfully', username: req.user.username});
  });

  app.get('/signout', users.signout);
};
