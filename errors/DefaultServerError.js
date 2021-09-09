const { ERR_500 } = require('../utils/constants');

class DefaultServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERR_500;
  }
}
module.exports = { DefaultServerError };
