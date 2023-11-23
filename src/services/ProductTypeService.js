const ProductType = require('../models/ProductTypeModel');

const createProductType = async (newProductType) => {
    try {
        const { name, image } = newProductType;

        if (!name || !image) {
            return {
                status: 'ERR',
                message: 'Missing required fields',
            };
        }

        const existingProductType = await ProductType.findOne({ name });

        if (existingProductType) {
            return {
                status: 'ERR',
                message: 'ProductType name already in use',
            };
        }

        const createdProductType = await ProductType.create({
            name,
            image,
        });

        return {
            status: 'OK',
            message: 'ProductType created successfully',
            data: createdProductType,
        };
    } catch (error) {
        return {
            status: 'ERR',
            message: error.message,
        };
    }
};

const updateProductType = async (productTypeId, data) => {
    try {
        const updatedProductType = await ProductType.findByIdAndUpdate(productTypeId, data, { new: true });

        if (!updatedProductType) {
            return { status: 'ERR', message: 'ProductType is not defined' };
        }

        return {
            status: 'OK',
            message: 'UPDATE PRODUCT TYPE SUCCESS',
            data: updatedProductType,
        };
    } catch (error) {
        return { status: 'ERR', message: error.message };
    }
};

const deleteProductType = async (productTypeId) => {
    try {
        const deletedProductType = await ProductType.findByIdAndDelete(productTypeId);

        if (!deletedProductType) {
            return { status: 'ERR', message: 'ProductType is not defined' };
        }

        return {
            status: 'OK',
            message: 'DELETE PRODUCT TYPE SUCCESS',
        };
    } catch (error) {
        return { status: 'ERR', message: error.message };
    }
};


const getAllProductTypes = async () => {
    try {
        const allProductType = await ProductType.find();
        return {
            status: 'OK',
            message: 'GET ALL PRODUCT TYPE SUCCESS',
            data: allProductType,
        };
    }
    catch (error) {
        return { status: 'ERR', message: error.message };
    }
};
const getCountProductType = async () => {
    try {
        const countProductType = await ProductType.find().select('-image');
        return {
            status: 'OK',
            message: 'GET COUNT PRODUCT TYPE SUCCESS',
            data: countProductType,
        };
    }
    catch (error) {
        return { status: 'ERR', message: error.message };
    }
};


const getDetailsProductType = async (productTypeId) => {
    try {
        const productType = await ProductType.findOne({ _id: productTypeId });

        if (!productType) {
            return { status: 'ERR', message: 'ProductType is not defined' };
        }

        return {
            status: 'OK',
            message: 'GET PRODUCT TYPE SUCCESS',
            data: productType,
        };
    } catch (error) {
        return { status: 'ERR', message: error.message };
    }
};

module.exports = {
    createProductType,
    updateProductType,
    deleteProductType,
    getAllProductTypes,
    getDetailsProductType,
    getCountProductType
};
