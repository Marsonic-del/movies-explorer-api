const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { NotFoundError } = require('../errors/NotFoundError');
const { NotValidDataError } = require('../errors/NotValidDataError');
const { ExistedEmailError } = require('../errors/ExistedEmailError');
// const { DefaultServerError } = require('../errors/DefaultServerError');
const { InvalidEmailOrPasswordError } = require('../errors/InvalidEmailOrPasswordError');
const { JWT_SECRET } = require('../utils/config');

const {
  errorMessages,
} = require('../utils/constants');

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
        .then((data) => {
          const user = data.toObject();
          delete user.password;
          res.send(user);
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            return next(new NotValidDataError(errorMessages.usersPost400));
          }
          if (err.name === 'MongoError' && err.code === 11000) {
            return next(new ExistedEmailError(errorMessages.notValidEmail409));
          }
          return next(err);
        });
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(() => {
      throw new InvalidEmailOrPasswordError(errorMessages.notValidEmailOrPassword);
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Нет пользователя с таким id'));
      }
      return res.send({ data: user });
    })
    .catch((err) => next(err));
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
        return next(new NotValidDataError(errorMessages.usersMePatch400));
      }
      if (err.name === 'MongoError' && err.code === 11000) {
        return next(new ExistedEmailError(errorMessages.notValidEmail409));
      }
      return next(err);
    });
};
module.exports = {
  createUser, login, getUserInfo, updateUser,
};
