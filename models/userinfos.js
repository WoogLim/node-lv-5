'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserInfos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // 한 회원은 한 회원 상세 정보를 가진다.
      this.belongsTo(models.Users, {
        targetKey: 'userId', // Users 모델의 userId 컬럼을
        foreignKey: 'userId', // UserInfos 모델의 userId 컬럼과 연결합니다.
      });
      // 한 회원은 하나의 포지션을 가진다.
      // this.belongsTo(models.CommonItems, {
      //   targetKey: 'itemId', // CommonItems 모델의 itemId 컬럼을
      //   foreignKey: 'position', // UserInfos 모델의 position 컬럼과 연결합니다.
      // });
    }
  }
  UserInfos.init(
    {
      userInfoId: {
        allowNull: false, // NOT NULL
        autoIncrement: true, // AUTO_INCREMENT
        primaryKey: true, // Primary Key (기본키)
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
      },
      profileImage: {
        allowNull: true, // NULL
        type: DataTypes.STRING,
        defaultValue:
          'https://user-images.githubusercontent.com/51357635/225285611-2d38b568-1cd6-4e85-9876-907a24baebcc.png',
      },
      name: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
      },
      age: {
        allowNull: true, // NULL
        type: DataTypes.INTEGER,
      },
      gender: {
        allowNull: true, // NULL
        type: DataTypes.STRING,
        defaultValue: '미지정',
      },
      position: {
        allowNull: true, // NULL
        type: DataTypes.STRING,
        defaultValue: '미지정',
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
      modelName: 'UserInfos',
    }
  );
  return UserInfos;
};