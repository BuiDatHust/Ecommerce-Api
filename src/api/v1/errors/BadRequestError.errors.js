const BaseError = require('./BaseError.errors')
const {StatusCodes}= require('http-status-codes')

class BadRequestError extends BaseError {
    constructor (
    name,
    statusCode = StatusCodes.BAD_REQUEST,
    description = 'Bad Request.',
    isOperational = true
    ) {
        super(name, statusCode, isOperational, description)
    }
}

module.exports = BadRequestError