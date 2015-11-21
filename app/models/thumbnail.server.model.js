var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var ThumbnailSchema = new Schema({
  title: {
    type: String,
    required: 'Se necesita un titulo'
  },
  body: String,
  imagePath: {
    type: String,
    required: 'Image needed'
  },
  imageName: {
    type: String,
    required: 'Image name required'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('Thumbnail', ThumbnailSchema);
