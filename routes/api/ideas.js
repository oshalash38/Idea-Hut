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
        'Short description must be no more than 200 characters'
      ).isLength({ max: 200 }),
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

// @route   GET /api/ideas/page/:page_number
// @desc    Gets ideas by page
// @access  Public
router.get('/page/:page_number', async (req, res) => {
  const options = {
    page: req.params.page_number,
    limit: 10,
    collation: {
      locale: 'en'
    }
  };
  try {
    const result = await Idea.find()
      .skip(20)
      .limit(10);
    res.json(result);
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
    for (var i = 0; i < idea.comments.length; i++) {
      const profile = await Profile.findOne({ user: idea.comments[i].user });
      if (profile) {
        idea.comments[i].username = profile.username;
        idea.comments[i].profile_picture = profile.profile_picture;
      }
    }

    await idea.save();
    console.log(idea);

    // console.log(idea);

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
      // Get user info
      const userProfile = await Profile.findOne({
        user: req.user.id
      });
      const { username, profile_picture } = userProfile;
      // Create new comment
      const comment = {
        user: req.user.id,
        text
        // username,
        // profile_picture
      };
      idea.comments.push(comment);
      await idea.save();
      // Add idea to interacted with ideas & check if its already there
      const found = userProfile.interacted_with.find(currIdea => {
        return currIdea.toString() === idea._id.toString();
      });
      if (!found) {
        userProfile.interacted_with.push(idea);
        await userProfile.save();
      }
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

// @route   PUT /api/ideas/idea/like/:id
// @desc    Adds a like to the idea with id <id> if havent already liked
// @access  Private
router.put('/idea/like/:id', auth, async (req, res) => {
  try {
    // Check if idea exists
    const idea = await Idea.findById(req.params.id);
    if (!idea) {
      return res.status(404).json({ msg: 'Idea with this id does not exist.' });
    }
    // Check if user already liked
    if (
      idea.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: 'Idea already liked' });
    }
    const user = req.user.id;
    idea.likes.unshift({ user });
    await idea.save();
    // Add idea to interacted with ideas & check if its already there
    const userProfile = await Profile.findOne({
      user
    });
    const found = userProfile.interacted_with.find(currIdea => {
      return currIdea.toString() === idea._id.toString();
    });
    console.log(found);

    if (!found) {
      userProfile.interacted_with.push(idea);
      await userProfile.save();
    }
    return res.json(idea.likes);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Invalid idea id.' });
    }
    return res.status(500).send('Server Error');
  }
});

// @route   PUT /api/ideas/idea/unlike/:id
// @desc    Removes a like from the idea with id <id> if already liked
// @access  Private
router.put('/idea/unlike/:id', auth, async (req, res) => {
  try {
    // Check if idea exists
    const idea = await Idea.findById(req.params.id);
    if (!idea) {
      return res.status(404).json({ msg: 'Idea with this id does not exist.' });
    }
    // Check if user hasn't already liked
    if (
      idea.likes.filter(like => like.user.toString() === req.user.id).length ===
      0
    ) {
      return res.status(400).json({ msg: 'Idea is not liked' });
    }
    const user = req.user.id;
    // Acquiring the index of the user to be removed
    const index = idea.likes.map(like => like.user.toString()).indexOf(user);
    // Removing the like
    idea.likes.splice(index, 1);
    await idea.save();
    return res.json(idea.likes);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Invalid idea id.' });
    }
    return res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/ideas/idea/:idea_id/:comment_id
// @desc    Removes a comment with id <comment_id> from the idea with id <idea_id>
// @access  Private
router.delete('/idea/:idea_id/:comment_id', auth, async (req, res) => {
  try {
    // Check if idea exists
    const idea = await Idea.findById(req.params.idea_id);
    if (!idea) {
      return res.status(404).json({ msg: 'Idea with this id does not exist.' });
    }
    // Check if comment exists
    const comment = idea.comments.find(
      comment => comment.id === req.params.comment_id
    );
    if (!comment) {
      return res
        .status(404)
        .json({ msg: 'Comment with this id does not exist.' });
    }
    // Check if comment belongs to current user (autherized)
    if (comment.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: 'Unautherized to perform this action.' });
    }
    // Remove comment
    const index = idea.comments
      .map(comment => comment.user.toString())
      .indexOf(req.user.id);
    idea.comments.splice(index, 1);
    idea.save();
    res.json(idea.comments);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Invalid id.' });
    }
    return res.status(500).send('Server Error');
  }
});

// @route   PUT /api/ideas/idea/bookmark/:id
// @desc    Bookmarks the idea with id <id> if it's already not bookmarked
// @access  Private
router.put('/idea/bookmark/:id', auth, async (req, res) => {
  try {
    // Check if idea exists
    const idea = await Idea.findById(req.params.id);
    if (!idea) {
      return res.status(404).json({ msg: 'Idea with this id does not exist.' });
    }
    // Check if idea is already bookmarked
    const userProfile = await Profile.findOne({ user: req.user.id });
    const found = userProfile.bookmarked.find(
      currIdea => currIdea.toString() === idea._id.toString()
    );
    if (found) {
      return res.status(400).json({ msg: 'Idea already bookmarked' });
    }
    userProfile.bookmarked.push(idea);
    await userProfile.save();
    res.json(userProfile.bookmarked);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Invalid id.' });
    }
    return res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/ideas/idea/bookmark/:id
// @desc    Removes bookmark of the idea with id <id> if it's already bookmarked
// @access  Private
router.delete('/idea/bookmark/remove/:id', auth, async (req, res) => {
  try {
    // Check if idea exists
    const idea = await Idea.findById(req.params.id);
    if (!idea) {
      return res.status(404).json({ msg: 'Idea with this id does not exist.' });
    }
    // Check if idea is not already bookmarked
    const userProfile = await Profile.findOne({ user: req.user.id });
    const found = userProfile.bookmarked.find(
      currIdea => currIdea.toString() === idea._id.toString()
    );
    if (!found) {
      return res.status(400).json({ msg: 'Idea is not bookmarked' });
    }
    // Get index to remove
    const index = userProfile.bookmarked
      .map(currIdea => currIdea.toString())
      .indexOf(req.params.id);
    userProfile.bookmarked.splice(index, 1);
    await userProfile.save();
    res.json(userProfile.bookmarked);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Invalid id.' });
    }
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
