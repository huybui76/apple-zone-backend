const User = require("../models/UserModel")
const bcrypt = require("bcrypt")
const { generalAccessToken, generalRefreshToken } = require("./jwtService")

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = newUser
        try {

            // check if user already exists
            const checkUser = await User.findOne({ email: email })
            if (checkUser !== null) { resolve({ status: 'OK', message: 'Email already in use' }) }

            // make hash password
            const hashPassword = bcrypt.hashSync(password, 10)

            // create new user
            const createUser = await User.create({ name, email, password: hashPassword, phone })
            if (createUser) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createUser
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
const loginUser = (loginUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = loginUser
        try {

            // check if user already exists
            const checkUser = await User.findOne({ email: email })
            if (checkUser === null) { resolve({ status: 'OK', message: 'User is not define' }) }

            // Checking the password
            const comparePassword = bcrypt.compare(password, checkUser.password)
            if (!comparePassword) {
                resolve({ status: 'OK', message: 'The password is incorrect' })
            }

            //add access token
            const access_token = await generalAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })

            const refresh_token = await generalRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                access_token,
                refresh_token
            })

        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    createUser,
    loginUser,
}