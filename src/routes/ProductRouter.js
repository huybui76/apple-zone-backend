const express = require("express");
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const { authMiddleware, authUserMiddleware } = require('../middleware/authMiddleware');

// User Routes
router.post('/', ProductController.createProduct);
router.put('/:productId', ProductController.updateProduct);
router.delete('/:productId', ProductController.deleteProduct);
router.get('/', ProductController.getAllProduct);
router.get('/:productId', ProductController.getDetailsProduct);
router.post('/deleteMany', ProductController.deleteMany)
router.get('/type/:productTypeId', ProductController.getProductByType)


module.exports = router;
