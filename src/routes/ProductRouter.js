const express = require("express");
const router = express.Router();
const ProductController = require('../controllers/productController');
const { authMiddleware, authUserMiddleware } = require('../middleware/authMiddleware');

// User Routes
router.post('/createProduct', ProductController.createProduct);
router.put('/updateProduct/:productId', authMiddleware, ProductController.updateProduct);
router.delete('/deleteProduct/:productId', authMiddleware, ProductController.deleteProduct);
router.get('/getAllProducts', ProductController.getAllProducts);
router.get('/getProduct/:productId', ProductController.getProduct);
router.post('/deleteManyProducts', authMiddleware, ProductController.deleteManyProducts)
router.get('/getAllTypes', ProductController.getAllTypes)


module.exports = router;
