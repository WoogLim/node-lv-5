'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LikePosts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // 게시글은 여러 좋아요를 여러개 가진다.
      this.belongsTo(models.Posts, {
        targetKey: 'postId', // Posts 모델의 postId 컬럼을
        foreignKey: 'postId', // 현재 모델의 postId 컬럼과 연결합니다.
      });

      // 사용자는 여러 게시글에 좋아요를 누른다.
      this.belongsTo(models.Users, {
        targetKey: 'userId', // Users 모델의 userId 컬럼을
        foreignKey: 'userId', // Posts 모델의 userId 컬럼과 연결합니다.
      });
    }
  }
  LikePosts.init(
    {
      likeId: {
        allowNull: false, // NOT NULL
        autoIncrement: true, // AUTO_INCREMENT
        primaryKey: true, // Primary Key (기본키)
        type: DataTypes.INTEGER,
      },
      postId: {
        allowNull: false, // NOT NULL
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false, // NOT NULL
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'LikePosts',
      uniqueKeys: {
        likePostKey: {
          fields: ['postId', 'userId'],
        },
      },
    }
  );
  return LikePosts;
};
