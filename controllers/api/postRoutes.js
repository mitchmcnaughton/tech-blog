const router = require('express').Router();
const { where } = require('sequelize');
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');
const helpers = require('../../utils/helpers')

router.post('/', withAuth, async (req, res) => {
    
   
    try {
        const user = await User.findAll({
            where: {
                id: req.session.user_id
            }
        })
        userData = user.map((data) => data.get({ plain: true}));
        
        const newPost = await Post.create({
          title: req.body.title,
          blog: req.body.blog,
          user_username: userData[0].username,
          date : helpers.format_date(new Date())
        });
    
        res.status(200).json(newPost);
      } catch (err) {
        console.error(err)
        res.status(400).json(err);
      }
    });

module.exports = router