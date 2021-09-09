const { ERR_401 } = require('../utils/constants');

class InvalidEmailOrPasswordError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERR_401;
  }
}
module.exports = { InvalidEmailOrPasswordError };
