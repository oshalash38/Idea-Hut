const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  bio: {
    type: String
  },
  profile_picture: {
    type: Buffer
  },
  my_ideas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'idea' }],
  interacted_with: [{ type: mongoose.Schema.Types.ObjectId, ref: 'idea' }],
  bookmarked: [{ type: mongoose.Schema.Types.ObjectId, ref: 'idea' }],
  socials: {
    website: {
      type: String
    },
    github: {
      type: String
    },
    facebook: {
      type: String
    },
    twitter: {
      type: String
    },
    youtube: {
      type: String
    },
    linkedin: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

profileSchema.plugin(uniqueValidator);

module.exports = mongoose.model('profile', profileSchema);
