const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const Movie = require('../models/movie');
const NoAccessError = require('../errors/NoAccessError');

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
    nameRU,
    nameEN,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные id'));
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
    .orFail(new NotFoundError('Карточка фильма не найдена'))
    .then((movie) => {
      // Проверка на принадлежность карточки пользователю
      if (owner.toString() !== movie.owner.toString()) {
        return next(new NoAccessError(`Пользователь с ID ${owner} не является владельцем данной карточки фильма`));
      }
      return Movie.findByIdAndRemove(movieId)
        .then(() => {
          res.send({ message: `Карточка фильма с ID ${movie.id} удалена` });
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан несуществующий ID карточки фильма'));
      }
      next(err);
    });
};
