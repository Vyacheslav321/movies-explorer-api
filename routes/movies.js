const router = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const {
  createMovieValidation,
  movieIdValidation,
} = require('../middlewares/validation');

// GET /movies — возвращает все сохранённые текущим  пользователем фильмы
router.get('/', getMovies);
// создаёт фильм с переданными в телеcountry, director, duration, year,
// description, image, trailer, nameRU, nameEN и thumbnail, movieId
router.post('/', createMovieValidation, createMovie);
// удаляет сохранённый фильм по id
router.delete('/:movieId', movieIdValidation, deleteMovie);

module.exports = router;
