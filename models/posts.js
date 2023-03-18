'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // 사용자는 여러 게시글을 소유한다.
      this.belongsTo(models.Users, {
        targetKey: 'userId', // Users 모델의 userId 컬럼을
        foreignKey: 'userId', // Posts 모델의 userId 컬럼과 연결합니다.
      });

      // 하나의 Post는 여러 Comment를 가짐
      this.hasMany(models.Comments, {
        sourceKey: 'postId', // 현재 모델의 postId 컬럼을
        foreignKey: 'postId', // Comments 모델의 postId 컬럼과 연결합니다.
      });

      // 하나의 Post는 여러 LikePosts 가짐
      this.hasMany(models.LikePosts, {
        sourceKey: 'postId', // 현재 모델의 postId 컬럼을
        foreignKey: 'postId', // LikePosts 모델의 postId 컬럼과 연결합니다.
      });

      // 하나의 Post는 여러 Tag를 가짐
      this.hasMany(models.PostTags, {
        sourceKey: 'postId', // 현재 모델의 postId 컬럼을
        foreignKey: 'postId', // PostTags 모델의 postId 컬럼과 연결합니다.
      });

      // 하나의 Post는 여러 image를 가짐(게시글)
      this.hasMany(models.PostImages, {
        sourceKey: 'postId', // 현재 모델의 postId 컬럼을
        foreignKey: 'postId', // PostImages 모델의 postId 컬럼과 연결합니다.
      });
    }
  }
  Posts.init(
    {
      postId: {
        allowNull: false, // NOT NULL
        autoIncrement: true, // AUTO_INCREMENT
        primaryKey: true, // Primary Key (기본키)
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
      },
      title: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
      },
      introduce: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
      },
      content: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
      },
      thumnail: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
        defaultValue:
          'https://s3.ap-northeast-2.amazonaws.com/blog.spartacodingclub.kr/sparta-supporters.png',
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
      modelName: 'Posts',
    }
  );
  return Posts;
};
