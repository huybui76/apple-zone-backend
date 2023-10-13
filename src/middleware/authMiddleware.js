const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = (req, res, next) => {
    const tokenHeader = req.headers.token;

    if (!tokenHeader) {
        return res.status(401).json({
            message: 'Unauthorized - Token header is missing',
            status: 'ERROR'
        });
    }

    const token = tokenHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(401).json({
                message: 'Unauthorized - No permission to access this resource',
                status: 'ERROR'
            });
        }

        const { payload } = user;
        // Check if the user has admin permit access
        if (payload?.isAdmin) {
            next();
        } else {
            return res.status(403).json({
                message: 'Forbidden - Insufficient permissions to access this resource',
                status: 'ERROR'
            });
        }
    });
};
const authUserMiddleware = (req, res, next) => {
    const tokenHeader = req.headers.token;
    const userId = req.params.id
    if (!tokenHeader) {
        return res.status(401).json({
            message: 'Unauthorized - Token header is missing',
            status: 'ERROR'
        });
    }

    const token = tokenHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(401).json({
                message: 'Unauthorized - No permission to access this resource',
                status: 'ERROR'
            });
        }

        const { payload } = user;
        // Check if the user has admin permit access
        if (payload?.isAdmin || payload?.id === userId) {
            next();
        } else {
            return res.status(403).json({
                message: 'Forbidden - Insufficient permissions to access this resource',
                status: 'ERROR'
            });
        }
    });
};

module.exports = {
    authMiddleware,
    authUserMiddleware
};
