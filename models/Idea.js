const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: true
  },
  detailedDescription: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  likes: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
    }
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      },
      text: {
        type: String,
        required: true
      },
      username: {
        type: String
      },
      profile_picture: {
        type: Buffer
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('idea', ideaSchema);
