const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const generalAccessToken = async (payload) => {
    const access_Token = jwt.sign({ payload }, process.env.ACCESS_TOKEN, { expiresIn: '30s' });
    return access_Token;
};

const generalRefreshToken = async (payload) => {
    const refresh_Token = jwt.sign({ payload }, process.env.REFRESH_TOKEN, { expiresIn: '365d' });
    return refresh_Token;
};

const refreshTokenJwt = (token) => {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                if (err) {
                    return resolve({
                        status: 'ERROR',
                        message: 'Token authentication failed',
                    });
                }

                const { payload } = user;
                const access_token = await generalAccessToken({
                    id: payload?.id,
                    isAdmin: payload?.isAdmin,
                });

                resolve({
                    status: 'OK',
                    message: 'REFRESH TOKEN SUCCESS',
                    access_token,
                });
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    generalAccessToken,
    generalRefreshToken,
    refreshTokenJwt,
};
