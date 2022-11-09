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

// возвращает все карточки фильмов пользователя
router.get('/', getMovies);
// создаёт карточку фильма
router.post('/', createMovieValidation, createMovie);
// удаляет сохранённый фильм по id
router.delete('/:movieId', movieIdValidation, deleteMovie);

module.exports = router;
