const express = require('express');
const router = express.Router();
const Idea = require('../../models/Idea');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const Profile = require('../../models/Profile');

// @route   POST /api/ideas/
// @desc    Creates a new idea
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Idea title is required')
        .not()
        .isEmpty(),
      check('shortDescription', 'A short description is required')
        .not()
        .isEmpty(),
      check(
        'shortDescription',
        'Short description must be no more than 100 characters'
      ).isLength({ max: 100 }),
      check('detailedDescription', 'A detailed description is required')
        .not()
        .isEmpty(),
      check('category', 'A category is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, shortDescription, detailedDescription, category } = req.body;
    try {
      // @todo: See if i will use username or not.
      // Get user name by id
      // const user = await User.findById(req.user.id).select('-password');
      // const name =
      user = req.user.id;
      const idea = new Idea({
        user,
        title,
        shortDescription,
        detailedDescription,
        category
      });
      await idea.save();
      const profile = await Profile.findOne({ user: req.user.id });
      profile.my_ideas.push(idea);
      await profile.save();
      res.json(idea);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET /api/ideas/all
// @desc    Gets all ideas
// @access  Public
router.get('/all', async (req, res) => {
  try {
    const ideas = await Idea.find().sort({ date: -1 });
    res.json(ideas);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/ideas/:category
// @desc    Gets ideas from a specific category
// @access  Public
router.get('/:category', async (req, res) => {
  try {
    const ideas = await Idea.find({ category: req.params.category }).sort({
      date: -1
    });
    res.json(ideas);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/ideas/idea/:id
// @desc    Gets an idea by its id
// @access  Public
router.get('/idea/:id', async (req, res) => {
  try {
    // Check if idea exists
    const idea = await Idea.findById(req.params.id);
    if (!idea) {
      return res.status(404).json({ msg: 'Idea with this id does not exist.' });
    }
    res.json(idea);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Invalid idea id.' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/ideas/idea/:id
// @desc    Deletes an idea by its id
// @access  Private
router.delete('/idea/:id', auth, async (req, res) => {
  try {
    // Check if idea exists
    const idea = await Idea.findById(req.params.id);
    if (!idea) {
      return res.status(404).json({ msg: 'Idea with this id does not exist.' });
    }
    // Check if logged in user is the idea author
    if (idea.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: 'Unautherized to perform operation.' });
    }
    await idea.remove();
    res.send('Idea removed.');
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Invalid idea id.' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/ideas/idea/comment/:id
// @desc    Adds a comment to the discussion in the idea with id <id>
// @access  Private
router.put(
  '/idea/comment/:id',
  [
    auth,
    [
      check('text', 'Comment must not be empty.')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { text } = req.body;
    try {
      // Check if idea exists
      const idea = await Idea.findById(req.params.id);
      if (!idea) {
        return res
          .status(404)
          .json({ msg: 'Idea with this id does not exist.' });
      }
      const { username, profile_picture } = await Profile.findOne({
        user: req.user.id
      });
      const comment = {
        user: req.user.id,
        text,
        username,
        profile_picture
      };
      idea.comments.unshift(comment);
      await idea.save();
      res.json(idea.comments);
    } catch (err) {
      console.error(err.message);
      if (err.kind == 'ObjectId') {
        return res.status(400).json({ msg: 'Invalid idea id.' });
      }
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
