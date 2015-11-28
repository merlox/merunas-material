var User = require('../models/user.server.model.js');

module.exports = function(app, express){
  app.use('/', express.static('public'));

  app.route('/api/users/:user_id')
    .get(function(req, res){
      User.findById(req.params.user_id, function(err, userFound){
        if(err) return res.send(err);
        else res.json(userFound);
      });
    })
    .put(function(req, res){
      User.findById(req.params.user_id, function(err, userFound){
        if(err) return res.send(err);
        userFound.username = req.body.username;
        userFound.password = req.body.password;
        userFound.phoneNumber = req.body.phoneNumber;
        userFound.save(function(err){
          if(err) return res.send(err);
          else res.json({
            message: 'User updated',
            data: userFound
          });
        })
      });
    })
    .delete(function(req, res){
      User.findOneAndRemove({
        _id: req.params.user_id
      }, function(err, userFound){
        if(err) return res.send(err);
        res.json({message: 'User removed successfully'});
      });
    });

  require('../routes/thumbnail.server.routes.js')(app);

  require('../routes/user.server.routes.js')(app);

  app.get('/public/js/directives/*', function(req, res){
    res.sendFile(rootPath+req.path);
  });
  app.get('/*', function(req, res){
    res.sendFile(rootPath+'/public/index.html');
  });
};
