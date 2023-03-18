const express = require('express');
const router = express.Router();

const AuthController = require('../controller/auth.controller');

const authController = new AuthController();

router.post('/signup', authController.createUser);
router.post('/login', authController.loginProcess);

module.exports = router;
