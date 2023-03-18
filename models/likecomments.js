'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LikeComments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // 댓글/답글은 여러 좋아요를 가진다.
      this.belongsTo(models.Comments, {
        targetKey: 'commentId', // Comments 모델의 commentId 컬럼을
        foreignKey: 'commentId', // 현재 모델의 commentId 컬럼과 연결합니다.
      });

      // 사용자는 여러 댓글/답글에 좋아요를 누른다.
      this.belongsTo(models.Users, {
        targetKey: 'userId', // Users 모델의 userId 컬럼을
        foreignKey: 'userId', // Posts 모델의 userId 컬럼과 연결합니다.
      });
    }
  }
  LikeComments.init(
    {
      likeId: {
        allowNull: false, // NOT NULL
        autoIncrement: true, // AUTO_INCREMENT
        primaryKey: true, // Primary Key (기본키)
        type: DataTypes.INTEGER,
      },
      commentId: {
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
      modelName: 'LikeComments',
      uniqueKeys: {
        likeCommentKey: {
          fields: ['commentId', 'userId'],
        },
      },
    }
  );
  return LikeComments;
};
