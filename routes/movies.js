const movieRouter = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');
const { createMovie, getMovies, deleteMovie } = require('../controllers/movies');
const { validateMoviePost, validateMovieId } = require('../middlewares/validations');

movieRouter.post('/', validateMoviePost, createMovie);
movieRouter.get('/', getMovies);
movieRouter.delete('/:movieId', validateMovieId, deleteMovie);
movieRouter.all((req, res, next) => { next(new NotFoundError('Несуществующий маршрут')); });

module.exports = movieRouter;
