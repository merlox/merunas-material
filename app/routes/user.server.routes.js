var users = require('../controllers/users.server.controller.js'),
  passport = require('passport'),
  configPassport = require('../../config/passport.js')();

module.exports = function(app){
  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/auth/twitter', function(req, res, next){
    if(req.headers.referer == 'http://localhost:8080/signin'){
      req.session.comprarCallbackUrl = '';
    }else{
      req.session.comprarCallbackUrl = req.headers.referer;
    }
    next();
  }, passport.authenticate('twitter'));
  app.get('/auth/twitter/callback', passport.authenticate('twitter'), function(req, res){
    req.session.username = req.user.username;
    req.session.userImage = req.user.providerData.profile_image_url;
    res.redirect(req.session.comprarCallbackUrl || '/');
  });

  app.get('/auth/facebook', function(req, res, next){
    if(req.headers.referer == 'http://localhost:8080/signin'){
      req.session.comprarCallbackUrl = '';
    }else{
      req.session.comprarCallbackUrl = req.headers.referer;
    }
    next();
  }, passport.authenticate('facebook'));
  app.get('/auth/facebook/callback', passport.authenticate('facebook'), function(req, res){
    req.session.username = req.user.username;
    req.session.userImage = req.user.providerData.profile_image_url;
    res.redirect(req.session.comprarCallbackUrl || '/');
  });

  app.get('/auth/google', function(req, res, next){
    if(req.headers.referer == 'http://localhost:8080/signin'){
      req.session.comprarCallbackUrl = '';
    }else{
      req.session.comprarCallbackUrl = req.headers.referer;
    }
    next();
  }, passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login']
  }));
  app.get('/auth/google/callback', passport.authenticate('google'), function(req, res){
    req.session.username = req.user.username;
    req.session.userImage = req.user.providerData.image.url;
    res.redirect(req.session.comprarCallbackUrl || '/');
  });


  app.post('/signup', users.signup);

  app.post('/signin', passport.authenticate('local'), function(req, res){
    res.json({message: 'logged successfully', username: req.user.username});
  });

  app.get('/signout', users.signout);
};
