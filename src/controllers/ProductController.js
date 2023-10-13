const ProductService = require('../services/ProductService');
const JwtService = require('../services/jwtService');

const validateProduct = (req) => {
    const { name, image, type, price, countInStock, rating, description } = req.body;

    if (!name || !image || !type || !price || !countInStock || !rating) {
        return {
            status: 'ERR',
            message: 'Please enter all required information',
        };
    }

    return null;
};

const genericErrorHandler = (res, e) => {
    return res.status(404).json({
        message: e,
    });
};

const createProduct = async (req, res) => {
    const validationError = validateProduct(req);
    if (validationError) {
        return res.status(200).json(validationError);
    }

    try {
        const response = await ProductService.createProduct(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return genericErrorHandler(res, e);
    }
};

const updateProduct = async (req, res) => {
    const productId = req.params.productId;
    if (!productId) {
        return res.status(200).json({
            status: 'ERR',
            message: 'Product ID is required',
        });
    }

    try {
        const response = await ProductService.updateProduct(productId, req.body);
        return res.status(200).json(response);
    } catch (e) {
        return genericErrorHandler(res, e);
    }
};

const deleteProduct = async (req, res) => {
    const productId = req.params.productId;
    if (!productId) {
        return res.status(200).json({
            status: 'ERR',
            message: 'Product ID is required',
        });
    }

    try {
        const response = await ProductService.deleteProduct(productId);
        return res.status(200).json(response);
    } catch (e) {
        return genericErrorHandler(res, e);
    }
};

const getAllProducts = async (req, res) => {
    try {
        const response = await ProductService.getAllProducts();
        return res.status(200).json(response);
    } catch (e) {
        return genericErrorHandler(res, e);
    }
};

const getProduct = async (req, res) => {
    const productId = req.params.productId;
    if (!productId) {
        return res.status(200).json({
            status: 'ERR',
            message: 'Product ID is required',
        });
    }

    try {
        const response = await ProductService.getProduct(productId);
        return res.status(200).json(response);
    } catch (e) {
        return genericErrorHandler(res, e);
    }
};

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getProduct,
};
