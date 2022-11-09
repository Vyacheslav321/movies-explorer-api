const router = require('express').Router();
const {
  getCurrentUser,
  updateProfile,
} = require('../controllers/users');
const {
  profileValidation,
} = require('../middlewares/validation');

// информация о пользователе
router.get('/me', getCurrentUser);

// обновляет профиль
router.patch('/me', profileValidation, updateProfile);

module.exports = router;
