const router = require('express').Router();
const {
  createUser,
  login,
} = require('../controllers/users');
const {
  signupValidation,
  signinValidation,
} = require('../middlewares/validation');

// Регистрация
router.post('/signup', signupValidation, createUser);
// Логин
router.post('/signin', signinValidation, login);

module.exports = router;
