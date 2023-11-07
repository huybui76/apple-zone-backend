const ProductTypeService = require('../services/ProductTypeService');
const Joi = require('joi');

const productTypeSchema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required(),

});

const createProductType = async (req, res) => {
    try {
        const { error } = productTypeSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                status: 'ERR',
                message: error.details[0].message,
            });
        }

        const response = await ProductTypeService.createProductType(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e,
        });
    }
};

const updateProductType = async (req, res) => {
    try {
        const productTypeId = req.params.productTypeId;
        const data = req.body;
        if (!productTypeId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The productTypeId is required',
            });
        }

        const response = await ProductTypeService.updateProductType(productTypeId, data);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e,
        });
    }
};

const getDetailsProductType = async (req, res) => {
    try {
        const productTypeId = req.params.productTypeId;
        if (!productTypeId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The productTypeId is required',
            });
        }

        const response = await ProductTypeService.getDetailsProductType(productTypeId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e,
        });
    }
};

const deleteProductType = async (req, res) => {
    try {
        const productTypeId = req.params.productTypeId;
        if (!productTypeId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The productTypeId is required',
            });
        }

        const response = await ProductTypeService.deleteProductType(productTypeId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e,
        });
    }
};

const getAllProductType = async (req, res) => {
    try {
        const response = await ProductTypeService.getAllProductTypes();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e,
        });
    }
};

module.exports = {
    createProductType,
    updateProductType,
    getDetailsProductType,
    deleteProductType,
    getAllProductType,
};
