const router = require('express').Router();
const { Post , User, Comment } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
    try {
      //get all posts
      const postData = await Post.findAll({});
      const postData2 = postData.map((post) => post.get({ plain: true}));
  
  
  res.render('homepage', {postData2, logged_in: true });
  } catch (err) {
      res.status(400).json(err);
  }
  });

  module.exports = router;