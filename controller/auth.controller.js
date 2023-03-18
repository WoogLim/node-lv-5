const Joi = require('joi');
const CustomError = require('../middlewares/errorHandler');
const AuthService = require('../services/auth.service');

class AuthController {
  authService = new AuthService();

  createUser = async (req, res, next) => {
    // 회원가입 validation
    try {
      const {
        userId,
        teamId = 0,
        password,
        confirm,
        nickname = 'Guest',
      } = req.body;

      const reqObj = Joi.object({
        userId: Joi.string()
          .pattern(new RegExp('^[a-zA-Z0-9]{3,}$'))
          .required()
          .messages({
            'string.base': 'ID는 문자로만 이루어져야 합니다.',
            'string.empty': 'ID를 입력해주세요.',
            'string.pattern.base':
              '대소문자 및 숫자가 포함된 3글자 이상의 ID를 입력해주세요.',
            'any.required': 'ID를 입력해주세요.',
          }),
        password: Joi.string()
          .pattern(new RegExp('^.{4,}$'))
          .required()
          .messages({
            'string.base': 'PW는 문자로만 이루어져야 합니다.',
            'string.empty': 'PW를 입력해주세요.',
            'string.pattern.base':
              '대소문자 및 숫자가 포함된 4글자 이상의 PW를 입력해주세요.',
            'any.required': 'PW를 입력해주세요.',
          }),
        confirm: Joi.valid(Joi.ref('password')).messages({
          'any.only': '비밀번호가 일치하지 않습니다.', // ref 일치 실패 시 커스텀 메시지
        }),
      });

      const validate = reqObj.validate({ userId, password, confirm });
      if (validate.error) {
        throw new CustomError(validate.error.message, 400, false);
      } else {
        console.log('Valid input!');
      }

      const createdUser = await this.authService.createUser(
        userId,
        teamId,
        password,
        nickname
      );

      if (createdUser == null) {
        throw new CustomError('회원 생성에 실패했습니다.', 400, false);
      } else {
        return res.status(200).json({
          success: true,
          message: '회원가입에 성공했습니다.',
        });
      }
    } catch (err) {
      next(err);
    }
  };

  loginProcess = async (req, res, next) => {
    try {
      const { userId, password } = req.body;

      const reqObj = Joi.object({
        userId: Joi.string()
          .pattern(new RegExp('^[a-zA-Z0-9]{3,}$'))
          .required(),
        password: Joi.string().pattern(new RegExp('^.{4,}$')).required(),
      });

      const validate = reqObj.validate({ userId, password });
      if (validate.error) {
        throw new CustomError(
          '닉네임 또는 패스워드를 확인해주세요.',
          400,
          false
        );
      } else {
        console.log('Valid input!');
      }

      const token = await this.authService.loginProcess(userId, password);

      res.cookie('authorization', `Bearer ${token}`);
      res.status(200).json({
        token,
        success: true,
        message: '로그인에 성공했습니다.',
      });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = AuthController;
