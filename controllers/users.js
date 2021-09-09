const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
// const { NotFoundError } = require('../errors/NotFoundError');
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
module.exports = { createUser, login };
