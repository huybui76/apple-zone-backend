const express = require("express");
const router = express.Router()
const userController = require('../controllers/UserController');

router.post('/sign-up', userController.createUser)
router.post('/login', userController.loginUser)
router.put('/update-user/:id', userController.updateUser)







module.exports = router