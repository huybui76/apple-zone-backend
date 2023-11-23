const express = require("express");
const router = express.Router();
const ProductController = require('../controllers/productController');
const { authMiddleware, authUserMiddleware } = require('../middleware/authMiddleware');

// User Routes
router.post('/createProduct', ProductController.createProduct);
router.put('/updateProduct/:productId', ProductController.updateProduct);
router.delete('/deleteProduct/:productId', ProductController.deleteProduct);
router.get('/getAllProducts', ProductController.getAllProduct);
router.get('/getCountProduct', ProductController.getCountProduct);
router.get('/getProduct/:productId', ProductController.getDetailsProduct);
router.post('/deleteMany', ProductController.deleteMany)
router.get('/getProductByType/:productTypeId', ProductController.getProductByType)


module.exports = router;
