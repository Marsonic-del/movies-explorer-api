const { ERR_409 } = require('../utils/constants');

class ExistedEmailError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERR_409;
  }
}
module.exports = { ExistedEmailError };
