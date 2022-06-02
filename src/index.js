require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const config = require('config')
const rateLimit = require('express-rate-limit') 
const helmet = require('helmet')
const { errorHandler } = require('./api/v1/errors/ErrorHandler.errors')

const connectMongoDb = require('./api/v1/db/connectMongo')
const route = require('./app')
const { connectRedisDb } = require('./api/v1/db/connectRedis')
const { logger } = require('./api/v1/logger/logger.logger')
// const rateLimitConfig = config.get("ratelimitConfig")

const port = process.env.PORT || 8000
const mongo_url = process.env.MONGO_URL
const cookiename = process.env.COOKIE_NAME
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json   
app.use(bodyParser.json())
app.use(cookieParser(cookiename))   
// app.use(cors({
//     origin: 'http://127.0.0.1:5500', //Chan tat ca cac domain khac ngoai domain nay
//     credentials: true //Để bật cookie HTTP qua CORS
// }))
//xử lý, lọc các HTTP header độc hại
app.use(helmet()) 
app.use(morgan('dev'));
// rate-limiting
// app.use(rateLimit(rateLimitConfig)) 

route(app)

process.on('unhandledRejection', (reason, promise) => {
    throw reason;
});
    
process.on('uncaughtException', (error) => {
    errorHandler.handleError(error);
    if (!errorHandler.isTrustedError(error)) {
      process.exit(1);
    }
});

const start = async () =>{
    try {
        await connectMongoDb(mongo_url)
        await connectRedisDb()
        
        app.listen(port, ()=>{
            console.log(`Server is listening on port ${port}`)
        })
    } catch (error) {
        throw new Error(error)
    }
}
start()

module.exports = app