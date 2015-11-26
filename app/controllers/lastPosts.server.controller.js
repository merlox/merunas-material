module.exports = function(req, res){
  var Thumbnail = require('../models/thumbnail.server.model.js');
  Thumbnail.find({}).select('thumbnailTitle').sort('-createdAt').limit(10).exec(function(err, thumbnailsFound){
    if(err) return res.send(err);
    res.json({
      thumbnailsFound
    });
  });
};
