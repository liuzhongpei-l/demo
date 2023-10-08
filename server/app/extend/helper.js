
const defaultConfig = require('../../config/config.default')
const jwt = require('jsonwebtoken')

const { createHmac } = require('node:crypto');

const signToken = async (userInfo) => {
    return jwt.sign({
        data: userInfo
    }, defaultConfig.secretString, { expiresIn: '1h' });
}

const verifyToken = async (token) => {
    return await jwt.verify(token, defaultConfig.secretString, function (err, decoded) {
        if (err) {
            return err.name
        } else {
            return decoded.data[0]
        }
    });
}

const signPassword = async (word) => {
    return createHmac('sha256', defaultConfig.secretString)
        .update(word)
        .digest('hex');
}

module.exports = {
    signToken,
    verifyToken,
    signPassword
}