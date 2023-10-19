const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  REG_EXP_IMG,
  REG_EXP_VID,
  REG_EXP_DATE,
} = require('../utils/constants');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required().pattern(REG_EXP_DATE).max(new Date().getFullYear()),
      description: Joi.string().required(),
      image: Joi.string().required().pattern(REG_EXP_IMG),
      trailerLink: Joi.string().required().pattern(REG_EXP_VID),
      thumbnail: Joi.string().required().pattern(REG_EXP_IMG),
      movieId: Joi.number().required(),
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
