const router = require('express').Router();
const { Landmark, User, Comment } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
    try {
      //get all posts
      const postData = await Post.findAll({
      include : [
          {
              model: User,
              as: 'user',
              attributes:['id','username']
          }
      ]
      });
      const postData2 = postData.map((post) => post.get({ plain: true}));
  
  
  res.render('homepage', {postData2, logged_in: req.session.logged_in });
  } catch (err) {
      res.status(400).json(err);
  }
  });
