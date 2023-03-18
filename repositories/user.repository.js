const { Users } = require('../models');

class UserRepository {
  // 사용자 조회
  findUser = async (userId) => {
    const searchUser = await Users.findOne({
      where: {
        userId,
      },
    });
    return searchUser;
  };
}

module.exports = UserRepository;
