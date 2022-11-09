const router = require('express').Router();
const auth = require('../middlewares/auth');
const authRouter = require('./auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFoundError = require('../errors/NotFoundError');
const { PAGE_NOT_FOUND } = require('../utils/errors');

router.use('/', authRouter); // Аутентификация логнин

router.use(auth); // Проверка токена

router.use('/users', usersRouter); // Работа с данными пользователя

router.use('/movies', moviesRouter); // Работа с карточками фильмов

router.all('*', (_req, _res, next) => {
  next(new NotFoundError(PAGE_NOT_FOUND));
});

module.exports = router;
