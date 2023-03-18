'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Teams extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // 한 팀은 여러 소속원이 존재한다.
      this.hasMany(models.Users, {
        targetKey: 'teamId', // 현재 모델의 teamId 컬럼을
        foreignKey: 'teamId', // Users 모델의 teamId 컬럼과 연결합니다.
      });
    }
  }
  Teams.init(
    {
      teamId: {
        allowNull: false, // NOT NULL
        autoIncrement: true, // AUTO_INCREMENT
        primaryKey: true, // Primary Key (기본키)
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false, // NOT NULL
        unique: true,
        type: DataTypes.STRING,
      },
      teamName: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
      },
      userRole: {
        allowNull: false, // NOT NULL
        type: DataTypes.INTEGER,
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
      modelName: 'Teams',
    }
  );
  return Teams;
};
