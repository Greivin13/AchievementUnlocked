const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class revComment extends Model {}

revComment.init(
  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      review_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'review',
          key: 'id'
        }
      },
      revComment_text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
      }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'revComment'
  }
);

module.exports = revComment;