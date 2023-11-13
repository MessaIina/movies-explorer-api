const Movie = require('../models/movie');
const ValidationError = require('../errors/validation-error');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');

const { CREATED_CODE_STATUS } = require('../utils/constants');

const getAllMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send({ movies }))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    movieId,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    movieId,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.status(CREATED_CODE_STATUS).send({
      movie,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFoundError('Ошибка при удалении - фильм не найден'))
    .then((movie) => {
      if (String(movie.owner) !== req.user._id) {
        throw new ForbiddenError('Вы не можете удалить чужой фильм');
      }
      return Movie.deleteOne({ movieId: movie.movieId }).then(() => {
        res.send({ movie });
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(
          new ValidationError('Передан некорректный идентификатор'),
        );
      } else {
        next(err);
      }
    });
};

module.exports = {
  getAllMovies,
  createMovie,
  deleteMovie,
};
