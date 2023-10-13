const Product = require("../models/ProductModel");

const createProduct = async (newProduct) => {
    try {
        const { name, image, type, price, countInStock, rating, description } = newProduct;

        const existingProduct = await Product.findOne({ name });
        if (existingProduct) {
            return { status: 'ERR', message: 'Product name already in use' };
        }

        const createdProduct = await Product.create({ name, image, type, price, countInStock, rating, description });

        return {
            status: 'OK',
            message: 'CREATE PRODUCT SUCCESS',
            data: createdProduct,
        };
    } catch (error) {
        return { status: 'ERR', message: error.message };
    }
};

const updateProduct = async (productId, data) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, data, { new: true });

        if (!updatedProduct) {
            return { status: 'ERR', message: 'Product is not defined' };
        }

        return {
            status: 'OK',
            message: 'UPDATE PRODUCT SUCCESS',
            data: updatedProduct,
        };
    } catch (error) {
        return { status: 'ERR', message: error.message };
    }
};

const deleteProduct = async (productId) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return { status: 'ERR', message: 'Product is not defined' };
        }

        return {
            status: 'OK',
            message: 'DELETE PRODUCT SUCCESS',
        };
    } catch (error) {
        return { status: 'ERR', message: error.message };
    }
};

const getAllProducts = async () => {
    try {
        const allProducts = await Product.find();

        return {
            status: 'OK',
            message: 'GET ALL PRODUCTS SUCCESS',
            data: allProducts,
        };
    } catch (error) {
        return { status: 'ERR', message: error.message };
    }
};

const getProduct = async (productId) => {
    try {
        const product = await Product.findOne({ _id: productId });

        if (!product) {
            return { status: 'ERR', message: 'Product is not defined' };
        }

        return {
            status: 'OK',
            message: 'GET PRODUCT SUCCESS',
            data: product,
        };
    } catch (error) {
        return { status: 'ERR', message: error.message };
    }
};

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getProduct,
};
