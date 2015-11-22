module.exports = function(app){
  var Thumbnail = require('../models/thumbnail.server.model.js');

  app.get('/api/thumbnails/search', function(req, res){
    var totalPages;
    var skipResults;
    var actualPage;
    if(!actualPage || actualPage==undefined || actualPage==null) actualPage=1;
    if(req.query.page){
      actualPage = req.query.page;
      skipResults = (actualPage-1)*18;
    }else{
      skipResults = 0;
    }
    if(req.query.limit){
      if(req.query.limit > 18){
        totalPages = Math.floor(req.query.limit/18);
      }else{
        totalPages = 1;
      }
    }
    Thumbnail.find({}).sort('-createdAt').limit(req.query.limit).skip(skipResults).exec(function(err, thumbnailsFound){
      Thumbnail.count({}, function(err, count){
        totalPages = count;
        if(err) return res.send(err);
        return res.json({
          thumbnailsFound,
          actualPage: actualPage,
          totalPages: totalPages
        });
      });
    });

  });

  app.route('/api/thumbnails/:title?')
    .get(function(req, res){
      if(req.query.lastPosts){
        require('../controllers/lastPosts.server.controller.js')(req, res);
      }else{
        var actualPage;
        var skipResults;
        var totalPages;
        if(actualPage==undefined || actualPage==null) actualPage=1;
        if(skipResults==undefined || skipResults==null) skipResults=0;
        if(req.query.page != null || req.query.page != undefined){
          actualPage = req.query.page;
          skipResults = (actualPage-1)*18;
        }
        Thumbnail.find({}).sort('-createdAt').limit(18).skip(skipResults).exec(function(err, thumbnailsFound){
          Thumbnail.count({}, function(err, count){
            totalPages = count;
            if(err) return res.send(err);
            return res.json({
              thumbnailsFound,
              actualPage: actualPage,
              totalPages: totalPages
            });
          });
        });
      }
    })
    .post(function(req, res){
      var multer = require('multer');
      var storage = multer.diskStorage({
        destination: function(req, file, cb){
          cb(null, rootPath+'/public/uploads');
        },
        filename: function(req, file, cb){
          cb(null, file.fieldname+'-'+Date.now()+'.jpg');
        }
      });
      var uploadImage = multer({storage: storage}).any();
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

};
