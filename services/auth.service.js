require('dotenv').config();

const AuthRepository = require('../repositories/auth.repository');
const UserRepository = require('../repositories/user.repository');
const {
  createHashPassword,
  comparePassword,
} = require('../modules/cryptoUtils.js');
const jwt = require('jsonwebtoken');
const CustomError = require('../middlewares/errorHandler');

class AuthService {
  authRepository = new AuthRepository();
  userRepository = new UserRepository();

  createUser = async (userId, teamId, password, nickname) => {
    const searchSameUserId = await this.userRepository.findUser(userId);

    if (searchSameUserId) {
      throw new CustomError('동일한 ID가 존재합니다.', 400, false);
    }

    const hashedPassword = await createHashPassword(password);

    const createUser = await this.authRepository.createUser(
      userId,
      teamId,
      hashedPassword,
      nickname
    );

    return createUser;
  };

  loginProcess = async (userId, password) => {
    const userInfo = await this.userRepository.findUser(userId);

    if (!userInfo) {
      throw new CustomError(
        '회원정보가 존재하지 않습니다. 아이디 또는 패스워드를 확인해주세요.',
        400,
        false
      );
    }

    const comparePw = await comparePassword(password, userInfo.password);

    if (!comparePw) {
      throw new CustomError(
        '회원정보가 존재하지 않습니다. 아이디 또는 패스워드를 확인해주세요.',
        400,
        false
      );
    }

    const token = jwt.sign({ userId: userInfo.userId }, process.env.SECRET_KEY);

    return token;
  };
}

module.exports = AuthService;
