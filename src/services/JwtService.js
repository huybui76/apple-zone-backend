const jwt = require('jsonwebtoken')

const generalAccessToken = async (payload) => {
    const access_Token = jwt.sign({ payload }, 'access_token', { expiresIn: '1h' });
    return access_Token
}
const generalRefreshToken = async (payload) => {
    const Refresh_Token = jwt.sign({ payload }, 'Refresh_token', { expiresIn: '365d' });
    return Refresh_Token
}

module.exports = {
    generalAccessToken,
    generalRefreshToken
}