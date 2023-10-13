const Product = require("../models/ProductModel");
const bcrypt = require("bcrypt");


const createProduct = async (newProduct) => {
    try {
        const { name, image, type, price, countInStock, rating, description } = newProduct;


        const existingProduct = await Product.findOne({ name });
        if (existingProduct) {
            return { status: 'ERR', message: 'Name product already in use' };
        }


        const createProduct = await Product.create({ name, image, type, price, countInStock, rating, description });

        return {
            status: 'OK',
            message: 'CREATE PRODUCT SUCCESS',
            data: createProduct,
        };
    } catch (error) {
        return { status: 'ERR', message: error.message };
    }
};
const updateProduct = async (id, data) => {
    try {
        const updateProduct = await Product.findByIdAndUpdate(id, data, { new: true });

        if (!updateProduct) {
            return { status: 'ERR', message: 'Product is not defined' };
        }

        return {
            status: 'OK',
            message: 'UPDATE PRODUCT SUCCESS',
            data: updateProduct,
        };
    } catch (error) {
        return { status: 'ERR', message: error.message };
    }
};



module.exports = {
    createProduct,
    updateProduct

};
