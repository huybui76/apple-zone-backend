const express = require("express");
const router = express.Router();
const ProductTypeController = require('../controllers/ProductTypeController');
const { authMiddleware } = require('../middleware/authMiddleware');

// User Routes
router.post('/createProductType', ProductTypeController.createProductType);
router.put('/updateProductType/:productTypeId', ProductTypeController.updateProductType);
router.delete('/deleteProductType/:productTypeId', ProductTypeController.deleteProductType);
router.get('/getAllProductsType', ProductTypeController.getAllProductType);
router.get('/getCountProductType', ProductTypeController.getCountProductType);
router.get('/getProductType/:productTypeId', ProductTypeController.getDetailsProductType);


module.exports = router;
