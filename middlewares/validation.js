const { celebrate, Joi } = require('celebrate');
const { linkReg } = require('../utils/constants');
const {
  MAX_NAME, MIN_NAME, MIN_PASS, UNCORRECT_EMAIL,
} = require('../utils/errors');

// проверка при создании пользователя
module.exports.signupValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .trim()
      .messages({
        'string.min': MIN_NAME,
        'string.max': MAX_NAME,
      }),
    email: Joi.string().required().email()
      .messages({
        'string.email': UNCORRECT_EMAIL,
      }),
    password: Joi.string().required().trim()
      .message({
        'string.min': MIN_PASS,
      }),
  }),
});

// проверка при логине
module.exports.signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'string.email': UNCORRECT_EMAIL,
      }),
    password: Joi.string().required().trim()
      .messages({
        'string.min': MIN_PASS,
      }),
  }),
});

// проверка при обновлении профиля
module.exports.profileValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required()
      .messages({
        'string.email': UNCORRECT_EMAIL,
      }),
    name: Joi.string().min(2).max(30).required()
      .trim()
      .messages({
        'string.min': MIN_NAME,
        'string.max': MAX_NAME,
      }),
  }),
});

// проверка при создании фильма
module.exports.createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().trim(),
    director: Joi.string().required().trim(),
    duration: Joi.number().required(),
    year: Joi.string().required().trim(),
    description: Joi.string().required().trim(),
    image: Joi.string().required().pattern(linkReg),
    trailerLink: Joi.string().required().pattern(linkReg),
    thumbnail: Joi.string().required().pattern(linkReg),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().trim(),
    nameEN: Joi.string().required().trim(),
  }),
});

// проверка при удалении фильма
module.exports.movieIdValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24).required(),
  }),
});
