const express = require("express");
const router = express.Router();
const ProductTypeController = require('../controllers/ProductTypeController');
const { authMiddleware } = require('../middleware/authMiddleware');

// User Routes
router.post('/', ProductTypeController.createProductType);
router.put('/:productTypeId', ProductTypeController.updateProductType);
router.delete('/:productTypeId', ProductTypeController.deleteProductType);
router.get('/', ProductTypeController.getAllProductType);
router.get('/:productTypeId', ProductTypeController.getDetailsProductType);


module.exports = router;
