const BaseError = require('./BaseError.errors')
const {StatusCodes}= require('http-status-codes')

class UnauthorizeError extends BaseError {
    constructor (
    name,
    statusCode = StatusCodes.UNAUTHORIZED,
    description = 'Unauthorized.',
    isOperational = true
    ) {
        super(name, statusCode, isOperational, description)
    }
}

module.exports = UnauthorizeError