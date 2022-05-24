const BaseError = require('./BaseError')
const {StatusCodes}= require('http-status-codes')

class NotFoundError extends BaseError {
    constructor (
    name,
    statusCode = StatusCodes.NOT_FOUND,
    description = 'Not found.',
    isOperational = true
    ) {
        super(name, statusCode, isOperational, description)
    }
}

module.exports = NotFoundError