var mongoose = require('mongoose'),
  random = require('mongoose-simple-random'),
  Schema = mongoose.Schema;
var ThumbnailSchema = new Schema({
  thumbnailTitle: {
    type: String,
    required: 'Se necesita un titulo'
  },
  thumbnailBody: {
    type: String,
    required: 'Contenido de la thumbnail required'
  },
  imagePath: {
    type: String,
    required: 'Image needed'
  },
  imageName: {
    type: String,
    required: 'Image name required'
  },
  articleTitle: {
    type: String,
    required: 'Article title required'
  },
  articleBody: {
    type: String,
    required: 'Article body required'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
//Use random selector module
ThumbnailSchema.plugin(random);
module.exports = mongoose.model('Thumbnail', ThumbnailSchema);
