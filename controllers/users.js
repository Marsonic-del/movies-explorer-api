const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { NotFoundError } = require('../errors/NotFoundError');
const { NotValidDataError } = require('../errors/NotValidDataError');
const { ExistedEmailError } = require('../errors/ExistedEmailError');
const { DefaultServerError } = require('../errors/DefaultServerError');
const { InvalidEmailOrPasswordError } = require('../errors/InvalidEmailOrPasswordError');
require('dotenv').config();

const {
  errorMessages,
} = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

// Создание пользователя
const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, email, password: hash,
      })
        .then((user) => {
          // eslint-disable-next-line no-param-reassign
          user = user.toObject();
          // eslint-disable-next-line no-param-reassign
          delete user.password;
          res.send(user);
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            throw new NotValidDataError(errorMessages.usersPost400);
          }
          if (err.name === 'MongoError' && err.code === 11000) {
            throw new ExistedEmailError(errorMessages.notValidEmail409);
          }
          throw new DefaultServerError(errorMessages.defaultMessage500);
        })
        .catch(next);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(() => { throw new InvalidEmailOrPasswordError(errorMessages.notValidEmailOrPassword); })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      res.send({ data: user });
    })
    .catch(() => { throw new DefaultServerError(errorMessages.defaultMessage500); })
    .catch(next);
};

// Обновление даных пользователя
const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true, upsert: false },
  )
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Нет пользователя с таким id'));
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        throw new NotValidDataError(errorMessages.usersMePatch400);
      }
      throw new DefaultServerError(errorMessages.defaultMessage500);
    })
    .catch(next);
};
module.exports = {
  createUser, login, getUserInfo, updateUser,
};
