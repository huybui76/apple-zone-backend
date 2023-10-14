const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const handleAuthenticationError = (res) => {
    return res.status(404).json({
        message: 'Authentication error',
        status: 'ERROR',
    })
}

const authMiddleware = (req, res, next) => {
    const tokenHeader = req.headers.token;

    if (!tokenHeader) {
        return handleAuthenticationError(res)
    }

    const accessToken = tokenHeader.split(' ')[1];

    jwt.verify(accessToken, process.env.ACCESS_TOKEN, (err, user) => {
        if (err || !user.isAdmin) {
            return handleAuthenticationError(res)
        }
        next();
    });
};
const authUserMiddleware = (req, res, next) => {
    const tokenHeader = req.headers.token;

    if (!tokenHeader) {
        return handleAuthenticationError(res)
    }

    const accessToken = tokenHeader.split(' ')[1];
    const userId = req.params.userId


    jwt.verify(accessToken, process.env.ACCESS_TOKEN, (err, user) => {

        if (err || user.id !== userId) {
            return handleAuthenticationError(res)
        }
        next();
    });
};

module.exports = {
    authMiddleware,
    authUserMiddleware
};
