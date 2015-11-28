var users = require('../controllers/users.server.controller.js'),
  passport = require('passport'),
  configPassport = require('../../config/passport.js')();


module.exports = function(app){
  app.route('/signup')
    .post(users.signup);

  app.post('/signin', passport.authenticate('local'), function(req, res){
      res.json({message: 'logged successfully', username: req.user.username});
    });

  app.get('/signout', users.signout);
};
