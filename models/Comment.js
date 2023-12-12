const { Model, DataTypes } = require ('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');
const Post = require('./Post')


class Comment extends Model {}

Comment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_username: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: User,
          key: 'username',
        },
      },
      post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Post,
          key: 'id',
        },
      },
      review: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date : {
        type: DataTypes.STRING,
        allowNull:false
    },
    
    
},
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'comment',
    }
  );
  
  module.exports = Comment;