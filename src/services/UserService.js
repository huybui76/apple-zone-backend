const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { generalAccessToken, generalRefreshToken } = require("./JwtService");

const createUser = async (newUser) => {
    try {
        const { name, email, password, phone } = newUser;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return { status: 'ERR', message: 'Email already in use' };
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const createUser = await User.create({ name, email, password: hashPassword, phone });

        return {
            status: 'OK',
            message: 'CREATE USER SUCCESS',
            data: createUser,
        };
    } catch (error) {
        return handleUserError(error);
    }
};

const loginUser = async (loginUser) => {
    try {
        const { email, password } = loginUser;
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return { status: 'ERR', message: 'User is not defined' };
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        if (!passwordMatch) {
            return { status: 'ERR', message: 'The password is incorrect' };
        }

        const access_token = await generalAccessToken({
            id: existingUser.id,
            isAdmin: existingUser.isAdmin,
        });

        const refresh_token = await generalRefreshToken({
            id: existingUser.id,
            isAdmin: existingUser.isAdmin,
        });

        return {
            status: 'OK',
            message: 'LOGIN USER SUCCESS',
            access_token,
            refresh_token,
        };
    } catch (error) {
        return handleUserError(error);
    }
};

const updateUser = async (id, data) => {
    try {
        const existingUser = await User.findById(id)

        // if (!existingUser.isAdmin || existingUser.id !== id) {
        //     return { status: 'ERR', message: 'Permission denied' };
        // }

        const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });

        if (!updatedUser) {
            return { status: 'ERR', message: 'User is not defined' };
        }

        return {
            status: 'OK',
            message: 'UPDATE USER SUCCESS',
            data: updatedUser,
        };
    } catch (error) {
        return handleUserError(error);
    }
};

const deleteUser = async (id) => {
    try {
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return { status: 'ERR', message: 'User is not defined' };
        }

        return {
            status: 'OK',
            message: 'DELETE USER SUCCESS',
        };
    } catch (error) {
        return handleUserError(error);
    }
};

const deleteManyUsers = async (ids) => {
    try {
        await User.deleteMany({ _id: { $in: ids } });
        return {
            status: 'OK',
            message: 'Delete users success',
        };
    } catch (error) {
        return handleUserError(error);
    }
};

const getAllUser = async () => {
    try {
        const allUsers = await User.find().sort({ createdAt: -1, updatedAt: -1 });

        return {
            status: 'OK',
            message: 'GET ALL USER SUCCESS',
            data: allUsers,
        };
    } catch (error) {
        return handleUserError(error);
    }
};

const getDetailsUser = async (id) => {
    try {
        const user = await User.findOne({ _id: id });

        if (!user) {
            return { status: 'ERR', message: 'User is not defined' };
        }

        return {
            status: 'OK',
            message: 'GET USER SUCCESS',
            data: user,
        };
    } catch (error) {
        return handleUserError(error);
    }
};

const handleUserError = (error) => {
    return { status: 'ERR', message: error.message };
};

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    deleteManyUsers
};
