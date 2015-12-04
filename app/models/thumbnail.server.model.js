var mongoose = require('mongoose'),
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
  random: {
    type: [Number],
    default: function(){
      return [Math.random(), Math.random()]
    },
    index: '2d'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('Thumbnail', ThumbnailSchema);
