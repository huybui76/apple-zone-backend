const UserService = require('../services/UserService');
const JwtService = require('../services/jwtService');

const validateUser = (req) => {
    const { name, email, password, confirmPassword, phone } = req.body;
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isCheckEmail = reg.test(email);

    if (!name || !email || !password || !confirmPassword || !phone) {
        return {
            status: 'ERR',
            message: 'Please enter all required information',
        };
    } else if (!isCheckEmail) {
        return {
            status: 'ERR',
            message: 'The input is not a valid email address',
        };
    } else if (password !== confirmPassword) {
        return {
            status: 'ERR',
            message: 'The password does not match the confirm password',
        };
    }

    return null;
};

const genericErrorHandler = (res, e) => {
    return res.status(500).json({
        status: 'ERR',
        message: 'An error occurred',
        error: e.message,
    });
};

const createUser = async (req, res) => {
    const validationError = validateUser(req);
    if (validationError) {
        return res.status(400).json(validationError);
    }

    try {
        const response = await UserService.createUser(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return genericErrorHandler(res, e);
    }
};

const loginUser = async (req, res) => {
    const validationError = validateUser(req);
    if (validationError) {
        return res.status(400).json(validationError);
    }

    try {
        const response = await UserService.loginUser(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return genericErrorHandler(res, e);
    }
};

const logoutUser = async (req, res) => {
    try {
        res.clearCookie('refresh_token');
        return res.status(200).json({
            status: 'OK',
            message: 'Logout successfully',
        });
    } catch (e) {
        return genericErrorHandler(res, e);
    }
};

const updateUser = async (req, res) => {
    const userId = req.params.userId;
    if (!userId) {
        return res.status(400).json({
            status: 'ERR',
            message: 'UserId is required',
        });
    }

    try {
        const response = await UserService.updateUser(userId, req.body);
        return res.status(200).json(response);
    } catch (e) {
        return genericErrorHandler(res, e);
    }
};

const deleteUser = async (req, res) => {
    const userId = req.params.userId;
    if (!userId) {
        return res.status(400).json({
            status: 'ERR',
            message: 'UserId is required',
        });
    }

    try {
        const response = await UserService.deleteUser(userId);
        return res.status(200).json(response);
    } catch (e) {
        return genericErrorHandler(res, e);
    }
};

const deleteManyUsers = async (req, res) => {
    const userIds = req.body.userIds;
    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
        return res.status(400).json({
            status: 'ERR',
            message: 'UserIds is required as a non-empty array',
        });
    }

    try {
        const response = await UserService.deleteManyUsers(userIds);
        return res.status(200).json(response);
    } catch (e) {
        return genericErrorHandler(res, e);
    }
};

const getAllUsers = async (req, res) => {
    try {
        const response = await UserService.getAllUsers();
        return res.status(200).json(response);
    } catch (e) {
        return genericErrorHandler(res, e);
    }
};

const getUser = async (req, res) => {
    const userId = req.params.userId;
    if (!userId) {
        return res.status(400).json({
            status: 'ERR',
            message: 'UserId is required',
        });
    }

    try {
        const response = await UserService.getUser(userId);
        return res.status(200).json(response);
    } catch (e) {
        return genericErrorHandler(res, e);
    }
};

const refreshToken = async (req, res) => {
    const token = req.headers.token && req.headers.token.split(' ')[1];

    if (!token) {
        return res.status(400).json({
            status: 'ERR',
            message: 'Token is required',
        });
    }

    try {
        const response = await JwtService.refreshTokenJwt(token);
        return res.status(200).json(response);
    } catch (e) {
        return genericErrorHandler(res, e);
    }
};

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUsers,
    getUser,
    refreshToken,
    deleteManyUsers,
    logoutUser,
};
