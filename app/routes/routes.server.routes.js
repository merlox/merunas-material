var User = require('../models/user.server.model.js');
var Thumbnail = require('../models/thumbnail.server.model.js');
var multer = require('multer');

module.exports = function(app, express){
  app.use('/', express.static('public'));

  var storage = multer.diskStorage({
    destination: function(req, file, cb){
      cb(null, rootPath+'/public/uploads');
    },
    filename: function(req, file, cb){
      cb(null, file.fieldname+'-'+Date.now()+'.jpg');
    }
  });
  var uploadImage = multer({storage: storage}).any();

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

  app.route('/api/thumbnails/:title?')
    .get(function(req, res){
      if(req.query.limit){
        Thumbnail.find({}).sort('-createdAt').limit(req.query.limit).exec(function(err, thumbnailsFound){
          if(err) return res.send(err);
          res.json(thumbnailsFound);
        });
      }else{
        var actualPage;
        var skipResults;
        var totalPages;
        if(actualPage==undefined || actualPage==null) actualPage=1;
        if(skipResults==undefined || skipResults==null) skipResults=0;
        if(req.query.page){
          actualPage = req.query.page;
          skipResults = (actualPage-1)*18;
        }
        Thumbnail.find({}).sort('-createdAt').limit(18).skip(skipResults).exec(function(err, thumbnailsFound){
          Thumbnail.count({}, function(err, count){
            totalPages = count;
            if(err) return res.send(err);
            res.json({
              thumbnailsFound,
              actualPage: actualPage,
              totalPages: totalPages
            });
          });
        });
      }
    })
    .post(function(req, res){
      var thumbnail = new Thumbnail();
      uploadImage(req, res, function(err){
        if(err) res.json(err);
        thumbnail.imagePath = req.files[0].path;
        thumbnail.imageName = req.files[0].filename;
        console.log('imageName :'+thumbnail.imageName);
        thumbnail.title = req.body.title;
        thumbnail.body = req.body.body;
        thumbnail.save(function(err){
          if(err) return res.send(err);
          res.json({
            message: 'Thumbnail added',
            credentials: {
              title: thumbnail.title,
              content: thumbnail.body
            }
          });
        });
      });
    })
    .delete(function(req, res){
      Thumbnail.findOneAndRemove({title: req.params.title}, function(err, thumbnailFound){
        if (err) return res.send(err);
        console.log('Removed');
        res.json({
          message: 'Removed successfully'
        });
      });
    })
    .put(function(req, res){
      Thumbnail.findOne({title: req.params.title}, function(err, thumbnailFound){
        if(err) return res.send('Error'+err);
        thumbnailFound.title = req.body.title;
        thumbnailFound.body = req.body.body;
        thumbnailFound.save(function(err){
          if(err) return res.send('Error'+err);
          console.log('updated: '+thumbnailFound.title);
          res.json({
            message:'updated'
          });
        });
      });
    });

  app.get('/public/js/directives/*', function(req, res){
    res.sendFile(rootPath+req.path);
  });
  app.get('/*', function(req, res){
    res.sendFile(rootPath+'/public/index.html');
  });
};
