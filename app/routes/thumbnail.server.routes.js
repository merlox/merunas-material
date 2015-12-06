var thumbnailCtrl = require('../controllers/thumbnail.server.controller.js');

module.exports = function(app){

  app.get('/api/thumbnails/search', thumbnailCtrl.searchThumbnails);

  app.route('/api/thumbnails/:title?')
    .get(thumbnailCtrl.getThumbnails)
    .post(thumbnailCtrl.postThumbnail)
    .delete(thumbnailCtrl.deleteThumbnail)
    .put(thumbnailCtrl.editThumbnail);

  app.put('/api/article/:title', thumbnailCtrl.editArticle);
};
