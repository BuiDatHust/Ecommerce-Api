const req = require('express/lib/request');
const jwt = require('jsonwebtoken');
const { client } = require('../db/connectRedis');
require('dotenv').config()

const secret = process.env.JWT_SECRET
const refreshsecret = process.env.REFRESH_SECRET
const tokenLifeTime = process.env.JWT_LIFETIME
const refreshtokenLifeTime = process.env.REFRESH_LIFETIME

const generateAccessToken = ( {payload} ) => {
    const token = jwt.sign({payload}, secret, {
        expiresIn: tokenLifeTime,
    });

    return token;
};

const generateRefreshToken = ( {payload} ) => {
    const token = jwt.sign({payload}, refreshsecret, {
        expiresIn: refreshtokenLifeTime,
    });

    return token;
};

const isToken = async ( token ) => {
    const decoded = await jwt.verify(token, secret);
    return decoded.payload
}

const isRefreshToken =async ( token ) => {
    const decoded = await jwt.verify(token, refreshsecret)
    return decoded.payload  
    
};

const attachTokenToRes = ( res, user,countAccess,countRefresh ) => {
    const token = generateAccessToken({payload: user} );
    const refreshToken = generateRefreshToken({payload: user})
    
    client.set(countAccess+"", token);
    client.set(countRefresh+"", refreshToken);

    res.cookie('accessToken', countAccess, {
        httpOnly: true,
        expires: new Date(Date.now()+ 3600000) ,
        // secure: true , 
        signed: true,
    });
    res.cookie('refreshToken', countRefresh, {
        httpOnly: true,
        expires: new Date(Date.now()+ 3600000*24*5) ,
        // secure: true , 
        signed: true,
    });
};

module.exports = {
    generateAccessToken,
    isToken,
    isRefreshToken, 
    attachTokenToRes,
};