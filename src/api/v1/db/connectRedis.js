const redis = require('redis');
const config = require('config');
// const db = config.get('redisConfig')

const client = redis.createClient({
    url : "redis://localhost:6379"  
    // url : "redis://redis"  
})

const connectRedisDb = async () =>{
    try {
        await client.connect() ;
        console.log("connected to redis")
    } catch (error) {
        console.log("error connecting to redis")
        throw new Error(error)
    }
}

module.exports = {
    client,connectRedisDb 
}