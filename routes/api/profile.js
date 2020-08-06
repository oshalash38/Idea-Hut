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
      username: username
    };

    if (req.file) {
      fields.profile_picture = req.file.buffer;
    } else {
      fields.profile_picture = null;
    }

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
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server error' });
  }
});

// @route   GET /api/profile/id/:userId
// @desc    Gets the profile of the user with <userId>
// @access  Public
router.get('/id/:userId', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.userId
    });
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

// @route   GET /api/profile/me
// @desc    Gets current user's profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res
        .status(404)
        .json({ msg: 'This user does not have a profile yet' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
