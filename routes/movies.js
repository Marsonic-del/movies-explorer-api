const movieRouter = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');
const { createMovie, getMovies, deleteMovie } = require('../controllers/movies');

movieRouter.post('/', createMovie);
movieRouter.get('/', getMovies);
movieRouter.delete('/:movieId', deleteMovie);
movieRouter.all((req, res, next) => { next(new NotFoundError('Несуществующий маршрут')); });

module.exports = movieRouter;
