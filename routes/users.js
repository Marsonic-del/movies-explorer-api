const userRouter = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');
const { getUserInfo, updateUser } = require('../controllers/users');

userRouter.get('/me', getUserInfo);
userRouter.patch('/me', updateUser);
userRouter.all((req, res, next) => { next(new NotFoundError('Несуществующий маршрут')); });

module.exports = userRouter;
