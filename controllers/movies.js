const Movie = require('../models/movie');
const { NotFoundError } = require('../errors/NotFoundError');
const { NotValidDataError } = require('../errors/NotValidDataError');
const { DefaultServerError } = require('../errors/DefaultServerError');
const { ForbiddenError } = require('../errors/ForbiddenError');
const { errorMessages } = require('../utils/constants');

// Создание фильма
const createMovie = (req, res, next) => {
  Movie.create({ owner: req.user._id, ...req.body })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new NotValidDataError(errorMessages.cardsPost400);
      }
      throw new DefaultServerError(errorMessages.defaultMessage500);
    })
    .catch(next);
};

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movie) => res.send({ data: movie }))
    .catch(() => { throw new DefaultServerError(errorMessages.defaultMessage500); })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.cardId)
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError(errorMessages.cardsDelete400));
      }
      if (JSON.stringify(movie.owner) !== JSON.stringify(req.user._id)) {
        return next(new ForbiddenError(errorMessages.cardsDelete403));
      }
      Movie.findByIdAndRemove(movie._id)
        .then(() => {
          res.send({ message: 'Фильм удален' });
        })
        .catch(() => {
          throw new DefaultServerError(errorMessages.defaultMessage500);
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new NotValidDataError(errorMessages.cardsDelete400);
      }
      throw new DefaultServerError(errorMessages.defaultMessage500);
    })
    .catch(next);
};

module.exports = { createMovie, getMovies };
