const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const Movie = require('../models/movie');
const ForbiddenError = require('../errors/ForbiddenError');
const { BAD_REQUEST_ERROR, FORBIDDEN_DELETE, CARD_NOT_FOUND } = require('../utils/errors');
const { CARD_DELETED } = require('../utils/messages');

// сработает при GET-запросе на URL /movies
module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .populate(['owner'])
    .then((movies) => res.send(movies))
    .catch((err) => {
      next(err);
    });
};

// сработает при POST-запросе на URL /movies
module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    owner,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST_ERROR));
      } else {
        next(err);
      }
    });
};

// сработает при DELETE-запросе на URL /movies/_id
module.exports.deleteMovie = (req, res, next) => {
  const owner = req.user._id;
  const { movieId } = req.params;
  Movie.findById(movieId)
    .orFail(new NotFoundError(CARD_NOT_FOUND))
    .then((movie) => {
      // Проверка на принадлежность карточки пользователю
      if (owner.toString() !== movie.owner.toString()) {
        return next(new ForbiddenError(FORBIDDEN_DELETE));
      }
      return Movie.findByIdAndRemove(movieId)
        .then(() => {
          res.send({ message: CARD_DELETED });
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(BAD_REQUEST_ERROR));
      }
      next(err);
    });
};
