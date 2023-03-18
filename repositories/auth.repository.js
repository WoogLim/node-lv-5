const CustomError = require('../middlewares/errorHandler');
const { Users } = require('../models');

class AuthRepository {
  createUser = async (userId, teamId, password, nickname) => {
    const createdUser = await Users.create({
      userId,
      teamId,
      password,
      nickname,
    });

    return createdUser;
  };

  loginProcess = async (userId, password) => {};
}

module.exports = AuthRepository;
