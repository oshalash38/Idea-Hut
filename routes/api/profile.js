const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const multer = require('multer');
const Profile = require('../../models/Profile');
const normalize = require('normalize-url');

const upload = multer({
  limits: {
    fileSize: 5000000 // max file size around 5MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
      cb(new Error('only upload files with jpg or jpeg or png format.'));
    }
    cb(null, true);
  }
});

// @route   POST /api/profile/
// @desc    Creates/Update a user profile
// @access  Private
router.post('/', auth, upload.single('profile_picture'), async (req, res) => {
  try {
    const {
      bio,
      username,
      website,
      github,
      youtube,
      twitter,
      linkedin,
      facebook
    } = req.body;

    const fields = {
      user: req.user.id,
      bio: bio,
      profile_picture: req.file.buffer,
      username: username
    };

    const socialLinks = {
      website,
      github,
      youtube,
      twitter,
      linkedin,
      facebook
    };
    // Normalizing social links
    for (const [key, value] of Object.entries(socialLinks)) {
      if (value && value.length > 0) {
        socialLinks[key] = normalize(value, { forceHttps: true });
      }
    }
    fields.socials = socialLinks;

    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: fields },
      { new: true, upsert: true }
    );
    profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/profile/
// @desc    Gets all profiles
// @access  Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['fName', 'lName']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server error' });
  }
});

// @route   GET /api/profile/:userId
// @desc    Gets the profile of the user with <userId>
// @access  Public
router.get('/:userId', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.userId
    }).populate('user', ['fName', 'lName']);
    if (!profile) {
      return res.status(404).json({ msg: 'Profile does not exist' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    return res.status(500).json({ msg: 'Server error' });
  }
});

// @route   PUT /api/profile/my_ideas
// @desc    Adds a new idea to profile's ideas
// @access  Private
router.put('/my_ideas', auth, async (req, res) => {
  // @todo: probably will do this in ideas file
});

module.exports = router;
