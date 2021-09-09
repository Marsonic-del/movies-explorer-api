// Константные значения кодов ошибок
const ERR_400 = 400;
const ERR_401 = 401;
const ERR_403 = 403;
const ERR_404 = 404;
const ERR_409 = 409;
const ERR_500 = 500;
const SECRET_KEY = 'some-secret-key';

// Обьект с описанием ошибки
const errorMessages = {
  usersPost400: 'Переданы некорректные данные при создании пользователя',

  notValidEmail409: 'Пользователь с таким email уже существует',

  notValidEmailOrPassword: 'Неправильные почта или пароль',

  usersIdGet: 'Пользователь по указанному _id не найден',

  usersMePatch400: 'Переданы некорректные данные при обновлении профиля',

  usersMePatch404: 'Пользователь с указанным _id не найден',

  usersMeAvatarPatch400: 'Переданы некорректные данные при обновлении аватара',

  usersMeAvatarPatch404: 'Пользователь с указанным _id не найден',

  cardsPost400: 'Переданы некорректные данные при создании карточки',

  cardsDelete400: 'Карточка с указанным _id не найдена',

  cardsDelete403: 'Вы не можете удалять чужые карточки',

  cardsLikes400: 'Переданы некорректные данные для постановки/снятии лайка',

  defaultMessage500: 'Ошибка сервера',
};

module.exports = {
  ERR_400,
  ERR_401,
  ERR_403,
  ERR_404,
  ERR_409,
  ERR_500,
  SECRET_KEY,
  errorMessages,
};
