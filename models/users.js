'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // 팀은 여러 소속원을 가진다.
      this.belongsTo(models.Teams, {
        // Teams 모델에게 N:1 관계 설정을 합니다.
        targetKey: 'teamId', // Teams 모델의 teamId 컬럼을
        foreignKey: 'teamId', // 현재 모델의 teamId 컬럼과 연결합니다.
      });

      // 사용자는 하나의 회원 상세 정보를 가진다.
      this.hasOne(models.UserInfos, {
        // userInfos 모델에게 1:1 관계 설정을 합니다.
        sourceKey: 'userId', // Users 모델의 userId 컬럼을
        foreignKey: 'userId', // userInfos 모델의 userId 컬럼과 연결합니다.
      });
      // 사용자는 여러 게시글을 소유한다.
      this.hasMany(models.Posts, {
        // Posts 모델에게 1:N 관계 설정을 합니다.
        sourceKey: 'userId', // Users 모델의 userId 컬럼을
        foreignKey: 'userId', // Posts 모델의 userId 컬럼과 연결합니다.
      });

      // 사용자는 여러 댓글을 작성한다.
      this.hasMany(models.Comments, {
        // Comments 모델에게 1:N 관계 설정을 합니다.
        sourceKey: 'userId', // Users 모델의 userId 컬럼을
        foreignKey: 'userId', // Comments 모델의 userId 컬럼과 연결합니다.
      });

      // 사용자는 여러 게시글에 좋아요를 누를 수 있다.
      this.hasMany(models.LikePosts, {
        // LikePosts 모델에게 1:N 관계 설정을 합니다.
        sourceKey: 'userId', // Users 모델의 userId 컬럼을
        foreignKey: 'userId', // LikePosts 모델의 userId 컬럼과 연결합니다.
      });

      // 사용자는 여러 댓글에 좋아요를 누를 수 있다.
      this.hasMany(models.LikeComments, {
        // LikeComments 모델에게 1:N 관계 설정을 합니다.
        sourceKey: 'userId', // Users 모델의 userId 컬럼을
        foreignKey: 'userId', // LikeComments 모델의 userId 컬럼과 연결합니다.
      });
    }
  }
  Users.init(
    {
      userId: {
        allowNull: false, // NOT NULL
        primaryKey: true, // Primary Key (기본키)
        type: DataTypes.STRING,
      },
      teamId: {
        allowNull: true, // NOT NULL
        type: DataTypes.INTEGER,
      },
      password: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
      },
      nickname: {
        allowNull: true, // NOT NULL
        type: DataTypes.STRING,
        defaultValue: 'Guest',
      },
      createdAt: {
        allowNull: false, // NOT NULL
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Users',
    }
  );
  return Users;
};
