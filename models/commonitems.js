'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CommonItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // 공통코드를 제공한다.
      // [Teams][userRole] role01 - 팀장, role02 - 팀원
      // [UserInfos][gender] gender01 - 남자, gender02 - 여자
      // [UserInfos][position] position01 - 백엔드 개발자, position02 - 프론트엔드 개발자, position03 - 데브옵스
    }
  }
  CommonItems.init(
    {
      itemId: {
        allowNull: false, // NOT NULL
        autoIncrement: true, // AUTO_INCREMENT
        primaryKey: true, // Primary Key (기본키)
        type: DataTypes.INTEGER,
      },
      itemUseTable: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
      },
      itemUseColum: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
      },
      itemCode: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
      },
      itemName: {
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
      modelName: 'CommonItems',
      uniqueKeys: {
        likePostKey: {
          fields: ['itemCode'],
        },
      },
    }
  );
  return CommonItems;
};
