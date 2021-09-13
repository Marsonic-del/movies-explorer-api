const Movie = require('../models/movie');
const { NotFoundError } = require('../errors/NotFoundError');
const { NotValidDataError } = require('../errors/NotValidDataError');
// const { DefaultServerError } = require('../errors/DefaultServerError');
const { ForbiddenError } = require('../errors/ForbiddenError');
const { errorMessages } = require('../utils/constants');

// Создание фильма
const createMovie = (req, res, next) => {
  Movie.create({ owner: req.user._id, ...req.body })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new NotValidDataError(errorMessages.cardsPost400));
      }
      return next(err);
    });
};

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => next(err));
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError(errorMessages.cardsDelete400));
      }
      if (JSON.stringify(movie.owner) !== JSON.stringify(req.user._id)) {
        return next(new ForbiddenError(errorMessages.cardsDelete403));
      }
      return Movie.findByIdAndRemove(movie._id)
        .then(() => {
          res.send({ message: 'Фильм удален' });
        });
      // .catch((err) => next(err));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new NotValidDataError(errorMessages.cardsDelete400));
      }
      return next(err);
    });
};

module.exports = { createMovie, getMovies, deleteMovie };
