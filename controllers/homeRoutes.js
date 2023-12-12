const router = require('express').Router();
const { Post , User, Comment } = require('../models');
const withAuth = require('../utils/auth');
const helpers = require('../utils/helpers')

router.get('/', async (req, res) => {
    try {
      //get all posts
      const postData = await Post.findAll({});
      const postData2 = postData.map((post) => post.get({ plain: true}));
  
  
  res.render('homepage', {postData2, logged_in: req.session.logged_in });
  } catch (err) {
      res.status(400).json(err);
  }
  });

  router.get('/login', (req, res) => {

    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login');

  })

  router.get('/signup', (req,res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('signup');
  })

  router.get('/dashboard', async (req,res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Post}],
      });
  
      const user = userData.get({ plain: true });
      console.log(user)
      res.render('dashboard', {
        user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/dashboard/:id', async (req,res)=> {
    try {
      const postData = await Post.findByPk(req.params.id)
      const postData2 = postData.get({ plain: true });
      
      res.render('dashboardid', {
        postData2,
        logged_in: true
      })
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.put('/dashboard/:id', async (req, res) => {
    try {
      
    const updatedPost = await Post.update({ },{
      where: {
        id: req.body.id
      }
      })

    } catch (err) {
      res.status(500).json(err)
    }
  });

  router.delete('/dashboard/:id', withAuth, async (req, res) => {
    try {
      console.log(req.body)
      const postData = await Post.destroy({
        where: {
          id: req.body.id,
          
        }
      });
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id!'})
      }
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  
    
  });

  let globalPostId;

  router.get('/post/:id', async (req,res) => {
    globalPostId = req.params.id;
    console.log(req.params.id)
    try {
     
      const postData = await Post.findByPk(req.params.id);

   

      const commentData = await Comment.findAll({
        where: {
          post_id:req.params.id
        }
      })
      
      
  
      const postData2 = postData ? postData.get({ plain: true }) : null;
    const commentData2 = commentData.map(comment => comment.get({ plain: true }));
      console.log(postData2,commentData2)
      res.render('post', {
        postData2,
        commentData2,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.post('/post/:id', async (req, res) => {
    
    try {
        const username = await User.findOne({
             where: { id: req.session.user_id
            }
        })
        
        
        let review = req.body.commentText;
        
        if (typeof review !== 'string') {
          review = String(review);
        }
        console.log(globalPostId)
        // Create a new comment
        const newComment = await Comment.create({
            user_username: username.username,
            post_id: globalPostId,
            review: review,
            date: helpers.format_date(new Date())
        });
  
        
        //find the particular landmark and associated comments again once new comment is posted
        const [postData, commentData] = await Promise.all([
            Post.findAll({
                where: { id: globalPostId },
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: ['id', 'username']
                    }
                ]
            }),
            Comment.findAll({
                where: { post_id: globalPostId },
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: ['id', 'username']
                    }
                ]
            })
        ]);
  
  
  
        const postDataMapped = postData.map((post) => post.get({ plain: true }));
        
        const postData2 = postDataMapped[0]
        const commentData2 = commentData.map((comment) => comment.get({ plain: true }));
        
        res.render('post', { commentData2, postData2, logged_in: true });
    } catch (error) {
        console.error('Error submitting comment:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });


  module.exports = router;