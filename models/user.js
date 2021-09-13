const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { errorMessages } = require('../utils/constants');
const { InvalidEmailOrPasswordError } = require('../errors/InvalidEmailOrPasswordError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

// добавим метод findUserByCredentials схеме пользователя
// у него будет два параметра — почта и пароль
userSchema.statics.findUserByCredentials = function (email, password, next) {
  // попытаемся найти пользовател по почте
  return this.findOne({ email }).select('+password') // this — это модель User
    .then((user) => {
      // не нашёлся — отклоняем промис
      if (!user) {
        return next(new InvalidEmailOrPasswordError(errorMessages.notValidEmailOrPassword));
      }

      // нашёлся — сравниваем хеши
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return next(new InvalidEmailOrPasswordError(errorMessages.notValidEmailOrPassword));
          }
          return user;
        });
    })
    .catch((err) => next(err));
};

module.exports = mongoose.model('user', userSchema);
