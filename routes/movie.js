const router = require('express').Router(); // создали роутер
const { celebrate, Joi } = require('celebrate');
const { REG_EXP_LINK } = require('../utils/constants');
const {
  getAllMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

// GET /movies — возвращает все сохранённые текущим пользователем фильмы
// POST /movies — создаёт фильм с переданными в теле
// DELETE /movies/:_id — удаляет сохранённый фильм по id

router.get('/', getAllMovies);

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      movieId: Joi.number().required(),
      image: Joi.string().required().pattern(REG_EXP_LINK),
      trailerLink: Joi.string().required().pattern(REG_EXP_LINK),
      thumbnail: Joi.string().required().pattern(REG_EXP_LINK),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  createMovie,
);

router.delete(
  '/:movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().length(24).hex(),
    }),
  }),
  deleteMovie,
);

module.exports = router;
