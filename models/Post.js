const { Model, DataTypes } = require ('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');

class Post extends Model {}

Post.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_username: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        }
      },
      blog: {
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
      modelName: 'landmark',
    }
  );
  
  module.exports = Post;