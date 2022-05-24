const BaseError = require('./BaseError.errors')
const {StatusCodes}= require('http-status-codes')

class UnauthenticateError extends BaseError {
    constructor (
    name,
    statusCode = StatusCodes.UNAUTHENTICATED,
    description = 'Unauthenticate.',
    isOperational = true
    ) {
        super(name, statusCode, isOperational, description)
    }
}

module.exports = UnauthenticateError