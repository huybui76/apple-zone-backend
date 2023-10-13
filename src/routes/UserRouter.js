const express = require("express");
const router = express.Router();
const userController = require('../controllers/UserController');
const { authMiddleware, authUserMiddleware } = require('../middleware/authMiddleware');

// User Routes
router.post('/signUp', userController.createUser);
router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser);
router.put('/updateUser/:userId', userController.updateUser);
router.delete('/deleteUser/:userId', authMiddleware, userController.deleteUser);
router.get('/getAllUsers', authMiddleware, userController.getAllUsers);
router.get('/getUser/:userId', authUserMiddleware, userController.getUser);
router.post('/refreshToken', userController.refreshToken);
router.post('/deleteMany', userController.deleteManyUsers);


module.exports = router;
