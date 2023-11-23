const express = require("express");
const router = express.Router();
const userController = require('../controllers/UserController');
const { authMiddleware, authUserMiddleware } = require('../middleware/authMiddleware');

// User Routes
router.post('/signUp', userController.createUser);
router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser);
router.put('/updateUser/:userId', userController.updateUser);
router.delete('/deleteUser/:userId', userController.deleteUser);
router.get('/getAllUsers', userController.getAllUser);
router.get('/getDetailsUser/:userId', userController.getDetailsUser);
router.post('/refreshToken', userController.refreshToken);
router.post('/deleteMany', userController.deleteManyUsers);


module.exports = router;
