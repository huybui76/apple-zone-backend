const ProductService = require('../services/ProductService');
const Joi = require('joi');

const productSchema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required(),
    type: Joi.string().required(),
    price: Joi.number().required(),
    countInStock: Joi.number().required(),
    rating: Joi.number().required(),
    description: Joi.string().allow(''),
    discount: Joi.number().allow(null).allow(''),
    sold: Joi.number().allow(null).allow(''),
});

const createProduct = async (req, res) => {
    try {
        const { error } = productSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                status: 'ERR',
                message: error.details[0].message,
            });
        }

        const response = await ProductService.createProduct(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e,
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        console.log(req.params)
        const data = req.body;
        if (!productId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The productId is required',
            });
        }

        const response = await ProductService.updateProduct(productId, data);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e,
        });
    }
};

const getDetailsProduct = async (req, res) => {
    try {
        const productId = req.params.productId;

        if (!productId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The productId is required',
            });
        }

        const response = await ProductService.getDetailsProduct(productId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e,
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        if (!productId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The productId is required',
            });
        }

        const response = await ProductService.deleteProduct(productId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e,
        });
    }
};

const deleteMany = async (req, res) => {
    try {
        const ids = req.body.ids;
        if (!ids) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The ids is required',
            });
        }

        const response = await ProductService.deleteManyProduct(ids);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e,
        });
    }
};

const getAllProduct = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query;
        const response = await ProductService.getAllProduct(Number(limit) || null, Number(page) || 0, sort, filter);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e,
        });
    }
};

const getAllType = async (req, res) => {
    try {
        const response = await ProductService.getAllType();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e,
        });
    }
};

module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct,
    deleteMany,
    getAllType,
};
