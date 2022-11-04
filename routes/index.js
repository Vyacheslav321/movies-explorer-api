const router = require('express').Router();
const auth = require('../middlewares/auth');
const authRouter = require('./auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFoundError = require('../errors/NotFoundError');

router.use('/', authRouter); // Аутентификация пользователяЛогнин

router.use(auth); // Проверка пользователя

router.use('/users', usersRouter); // Работа с данными пользователя

router.use('/movies', moviesRouter); // Работа с карточками

router.all('*', (_req, _res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
