const jwt = require('jsonwebtoken');
const NotValidError = require('../errors/NotValidError');
const { JWT_KEY } = require('../utils/config');
const { AUTH_PERMISSION, BAD_TOKEN } = require('../utils/errors');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new NotValidError(AUTH_PERMISSION); // 401
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_KEY);
  } catch (err) {
    return next(new NotValidError(BAD_TOKEN)); // 401
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  return next();
};

module.exports = auth;
