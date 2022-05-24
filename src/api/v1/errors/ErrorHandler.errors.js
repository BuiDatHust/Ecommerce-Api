const { logger } = require('../logger/logger.logger');
const BaseError = require('./BaseError.errors')

class ErrorHandler {
    async handleError(err){
      await logger.error(
        'Error message from the centralized error-handling component: ',
        err,
      );
    }
    
    isTrustedError(error) {
      if (error instanceof BaseError) {
        return error.isOperational;
      }
      return false;
    }
}

module.exports = {
  errorHandler: new ErrorHandler()
}