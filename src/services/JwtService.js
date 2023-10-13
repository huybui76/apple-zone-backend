const jwt = require('jsonwebtoken')
const dotenv = require("dotenv")

const generalAccessToken = async (payload) => {
    const access_Token = jwt.sign({ payload }, process.env.ACCESS_TOKEN, { expiresIn: '1h' });
    return access_Token
}
const generalRefreshToken = async (payload) => {
    const refresh_Token = jwt.sign({ payload }, process.env.REFRESH_TOKEN, { expiresIn: '365d' });
    return refresh_Token
}

module.exports = {
    generalAccessToken,
    generalRefreshToken
}