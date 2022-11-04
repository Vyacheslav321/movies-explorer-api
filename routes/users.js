const router = require('express').Router();
const {
  getCurrentUser,
  updateProfile,
} = require('../controllers/users');
const {
  profileValidation,
} = require('../middlewares/validation');

// информация о пользователе (email и имя)
router.get('/me', getCurrentUser);

// обновляет профиль (email и имя)
router.patch('/me', profileValidation, updateProfile);

module.exports = router;
