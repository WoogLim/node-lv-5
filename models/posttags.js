'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostTags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // 게시글은 여러 태그를 가진다.
      this.belongsTo(models.Posts, {
        targetKey: 'postId', // Posts 모델의 postId 컬럼을
        foreignKey: 'postId', // 현재 모델의 postId 컬럼과 연결합니다.
      });
    }
  }
  PostTags.init(
    {
      postTagId: {
        allowNull: false, // NOT NULL
        autoIncrement: true, // AUTO_INCREMENT
        primaryKey: true, // Primary Key (기본키)
        type: DataTypes.INTEGER,
      },
      postId: {
        allowNull: false, // NOT NULL
        type: DataTypes.INTEGER,
      },
      tagName: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false, // NOT NULL
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false, // NOT NULL
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        hooks: {
          beforeUpdate: (user, options) => {
            user.updatedAt = new Date();
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'PostTags',
    }
  );
  return PostTags;
};
