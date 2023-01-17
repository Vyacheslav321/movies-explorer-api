const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AlreadyExistDataError = require('../errors/AlreadyExistDataError');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const NotValidError = require('../errors/NotValidError');
const User = require('../models/user');
const { JWT_KEY } = require('../utils/config');
const {
  ALREDY_EXIST_USER_EMAIL,
  USER_NOT_FOUND,
  BAD_REQUEST_ERROR,
  AUTH_BAD_PASSWORD,
} = require('../utils/errors');

// контроллер регистрации
module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  User.findOne({ email });
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((userData) => res.send({
      email: userData.email,
      name: userData.name,
      id: userData._id,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST_ERROR)); // 400
      } else if (err.code === 11000) {
        next(new AlreadyExistDataError(ALREDY_EXIST_USER_EMAIL)); // 409
      } else {
        next(err);
      }
    });
};
// контроллер login
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new NotValidError(USER_NOT_FOUND); // 401
      }
      bcrypt.compare(password, user.password, (error, isValidPassword) => {
        if (!isValidPassword) {
          return next(new NotValidError(AUTH_BAD_PASSWORD)); // 401
        }
        const token = jwt.sign({ _id: user._id }, JWT_KEY, { expiresIn: '7d' });
        return res.send({ token });
      });
    })
    .catch((err) => {
      next(err);
    });
};

// сработает при GET запросе на URL /users/me
module.exports.getCurrentUser = (req, res, next) => {
  User.findById({ _id: req.user._id })
    .orFail(new NotFoundError(USER_NOT_FOUND))
    .then((userData) => res.send({
      email: userData.email,
      name: userData.name,
      id: userData._id,
    }))
    .catch((err) => {
      next(err);
    });
};

// обновляет профиль
// сработает при PATCH запросе на URL /users/me
module.exports.updateProfile = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { runValidators: true, new: true },
  )
    .orFail(new NotFoundError(USER_NOT_FOUND)) // 404
    .then((userData) => res.send({
      email: userData.email,
      name: userData.name,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST_ERROR));
      } else if (err.code === 11000) {
        next(new AlreadyExistDataError(ALREDY_EXIST_USER_EMAIL)); // 409
      } else {
        next(err);
      }
    });
};
