var User = require('../models/user.server.model.js');

module.exports = function(app, express){
  app.use('/', express.static('public'));

  function loggedIn(req, res, next){
    if(req.user){
      console.log(req.user.authenticated);
    }else{console.log('not authenticated')}
    next();
  }

  require('../routes/thumbnail.server.routes.js')(app);
  require('../routes/user.server.routes.js')(app);

  app.get('/public/js/directives/*', function(req, res){
    res.sendFile(rootPath+req.path);
  });
};
