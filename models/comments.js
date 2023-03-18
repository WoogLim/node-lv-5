'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // 하나의 댓글/답글은 여러 좋아요를 가진다.
      this.hasMany(models.LikeComments, {
        sourceKey: 'commentId',
        foreignKey: 'commentId',
      });

      // 게시글은 여러 댓글을 가진다.
      this.belongsTo(models.Posts, {
        targetKey: 'postId', // Posts 모델의 postId 컬럼을
        foreignKey: 'postId', // 현재 모델의 postId 컬럼과 연결합니다.
      });

      // 사용자는 여러 댓글을 작성한다.
      this.belongsTo(models.Users, {
        targetKey: 'userId', // Users 모델의 userId 컬럼을
        foreignKey: 'userId', // 현재 모델의 userId 컬럼과 연결합니다.
      });
    }
  }
  Comments.init(
    {
      commentId: {
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
      parentCommentId: {
        allowNull: true, // NULL
        type: DataTypes.INTEGER,
      },
      content: {
        allowNull: false, // NULL
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
      modelName: 'Comments',
    }
  );
  return Comments;
};
