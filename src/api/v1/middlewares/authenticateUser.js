const { client } = require("../db/connectRedis");
const createTokenUser = require("../helpers/createTokenUser");
const { isToken } = require("../helpers/jwt");

const authenticateUser = async (req, res, next) => {
    const fakeToken = req.signedCookies.accessToken;

    const token = await client.get(fakeToken)
    console.log(token);

    if (!token) {
        throw new Error('Authenticate Fail');
    }

    try {
        const user = await isToken( token );
        req.user = createTokenUser(user);
        next();
    } catch (error) {
        throw new Error('Authenticate Fail');
    }
};

const authorizePermission = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new Error('Unauthrize to access');
        }
        next();
    };
};

module.exports = {
    authenticateUser,
    authorizePermission,
};
