const UserService = require('../services/UserService');
const JwtService = require('../services/JwtService');
const Joi = require('joi');

const createUserSchema = Joi.object({
    name: Joi.string().required(),
    isAdmin: Joi.boolean().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
    confirmPassword: Joi.string().valid(Joi.ref('password')),
    phone: Joi.string().required().min(9),

});

const createUser = async (req, res) => {
    try {
        const { error } = createUserSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                status: 'ERR',
                message: error.details[0].message,
            });
        }

        const response = await UserService.createUser(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e,
        });
    }
};

const loginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const loginUser = async (req, res) => {
    try {
        const { error } = loginUserSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                status: 'ERR',
                message: error.details[0].message,
            });
        }

        const response = await UserService.loginUser(req.body);
        const { refresh_token, ...newResponse } = response;
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: true,  // Use HTTPS
            sameSite: 'strict',
            path: '/',
        });
        return res.status(200).json({ ...newResponse, refresh_token });
    } catch (e) {
        return res.status(500).json({
            message: e,
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        const data = req.body;
        if (!userId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'UserId is required',
            });
        }

        const response = await UserService.updateUser(userId, data);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e,
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!userId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The userId is required',
            });
        }

        const response = await UserService.deleteUser(userId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e,
        });
    }
};

const deleteManyUsers = async (req, res) => {
    try {
        const ids = req.body.ids;
        if (!ids) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The ids is required',
            });
        }

        const response = await UserService.deleteManyUsers(ids);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e,
        });
    }
};

const getAllUser = async (req, res) => {
    try {
        const response = await UserService.getAllUser();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e,
        });
    }
};

const getDetailsUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!userId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The userId is required',
            });
        }

        const response = await UserService.getDetailsUser(userId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e,
        });
    }
};

const refreshToken = async (req, res) => {
    try {
        let token = req.headers.token.split(' ')[1];
        if (!token) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The token is required',
            });
        }

        const response = await JwtService.refreshTokenJwtService(token);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e,
        });
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
        return res.status(500).json({
            message: e,
        });
    }
};

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    refreshToken,
    deleteManyUsers,
    logoutUser,

};
