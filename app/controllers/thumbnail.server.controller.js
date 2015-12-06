var Thumbnail = require('../models/thumbnail.server.model.js');

exports.searchThumbnails = function(req, res){
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
};

exports.getThumbnails = function(req, res){
  if(req.query.lastPosts){
    require('../controllers/lastPosts.server.controller.js')(req, res);
  }else{
    var actualPage;
    var skipResults;
    var totalPages;
    //Total pages count
    Thumbnail.count({}, function(err, count){
      if(err) return res.send(err);
      totalPages = count;
    });
    if(actualPage==undefined || actualPage==null) actualPage=1;
    if(skipResults==undefined || skipResults==null) skipResults=0;
    if(req.query.page != null || req.query.page != undefined){
      actualPage = req.query.page;
      skipResults = (actualPage-1)*18;
    }
    Thumbnail.find({}).sort('-createdAt').limit(18).skip(skipResults).exec(function(err, thumbnailsFound){
      if(err) return res.send(err);
      return res.json({
        thumbnailsFound,
        actualPage: actualPage,
        totalPages: totalPages
      });
    });
  }
};

exports.postThumbnail = function(req, res){
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
  if(req.session.username === 'Merunas Grincalaitis' || req.session.username === 'Merlox' || req.session.username === 'Merlox Gr'){
    uploadImage(req, res, function(err){
      if(err) res.json(err);
      thumbnail.imagePath = req.files[0].path;
      thumbnail.imageName = req.files[0].filename;
      thumbnail.thumbnailTitle = req.body.thumbnailTitle;
      thumbnail.thumbnailBody = req.body.thumbnailBody;
      thumbnail.articleTitle = req.body.articleTitle;
      thumbnail.articleBody = req.body.articleBody;
      thumbnail.save(function(err){
        if(err) return res.send(err);
        res.json({
          message: 'Thumbnail added'
        });
      });
    });
  }else{
    res.json({message: 'You don´t have permission'});
  }
};

exports.deleteThumbnail = function(req, res){
  if(req.session.username === 'Merunas Grincalaitis' || req.session.username === 'Merlox' || req.session.username === 'Merlox Gr'){
    Thumbnail.findOneAndRemove({thumbnailTitle: req.params.title}, function(err, thumbnailFound){
      if (err) return res.send(err);
      console.log('Removed');
      res.json({
        message: 'Removed successfully'
      });
    });
  }
};

exports.editThumbnail = function(req, res){
  if(req.session.username === 'Merunas Grincalaitis' || req.session.username === 'Merlox' || req.session.username === 'Merlox Gr'){
    Thumbnail.findOne({thumbnailTitle: req.params.title}, function(err, thumbnailFound){
      if(err) return res.send('Error'+err);
      if(req.body.thumbnailTitle && req.body.thumbnailTitle != undefined){
        thumbnailFound.thumbnailTitle = req.body.thumbnailTitle;
      }
      if(req.body.thumbnailBody && req.body.thumbnailBody != undefined){
        thumbnailFound.thumbnailBody = req.body.thumbnailBody;
      }
      thumbnailFound.save(function(err){
        if(err) return res.send('Error'+err);
        console.log('updated: '+thumbnailFound.title);
        res.json({
          message:'updated'
        });
      });
    });
  }
};

exports.editArticle = function(req, res){
  if(req.session.username === 'Merunas Grincalaitis' || req.session.username === 'Merlox' || req.session.username === 'Merlox Gr'){
    Thumbnail.findOne({thumbnailTitle: req.params.title}, function(err, thumbnailFound){
      if(err) return res.send('Error'+err);
      if(req.body.articleTitle && req.body.articleTitle != undefined){
        thumbnailFound.articleTitle = req.body.articleTitle;
      }
      if(req.body.articleBody && req.body.articleBody != undefined){
        thumbnailFound.articleBody = req.body.articleBody;
      }
      thumbnailFound.save(function(err){
        if(err) return res.send('Error'+err);
        return res.json({
          message:'updated'
        });
      });
    });
  }else{
    console.log('Not authorized, you must be admin to do that');
    return res.send('Not authorized, you must be admin to do that');
  }
}
