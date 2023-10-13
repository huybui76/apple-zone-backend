const Product = require('../models/ProductModel');

const createProduct = async (newProduct) => {
    try {
        const { name, image, type, countInStock, price, rating, description, discount } = newProduct;

        if (!name || !image || !type || !countInStock || !price || !rating || !discount) {
            return {
                status: 'ERR',
                message: 'Missing required fields',
            };
        }

        const existingProduct = await Product.findOne({ name });

        if (existingProduct) {
            return {
                status: 'ERR',
                message: 'Product name already in use',
            };
        }

        const createdProduct = await Product.create({
            name,
            image,
            type,
            countInStock: Number(countInStock),
            price,
            rating,
            description,
            discount: Number(discount),
        });

        return {
            status: 'OK',
            message: 'Product created successfully',
            data: createdProduct,
        };
    } catch (error) {
        return {
            status: 'ERR',
            message: error.message,
        };
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

const deleteManyProduct = async (productIds) => {
    try {
        const deletedProducts = await Product.deleteMany({ _id: { $in: productIds } });

        if (!deletedProducts || deletedProducts.deletedCount === 0) {
            return { status: 'ERR', message: 'No products were deleted' };
        }

        return {
            status: 'OK',
            message: 'DELETE PRODUCT SUCCESS',
        };
    } catch (error) {
        return { status: 'ERR', message: error.message };
    }
};

const getAllProduct = async (limit, page, sort, filter) => {
    try {
        const query = {};

        if (filter) {
            const [label, value] = filter;
            query[label] = { $regex: value };
        }

        const totalProduct = await Product.countDocuments(query);
        const options = { limit, skip: page * limit, sort: { createdAt: -1, updatedAt: -1 } };
        const allProducts = await Product.find(query, null, options);

        return {
            status: 'OK',
            message: 'Success',
            data: allProducts,
            total: totalProduct,
            pageCurrent: Number(page + 1),
            totalPage: Math.ceil(totalProduct / limit),
        };
    } catch (error) {
        return { status: 'ERR', message: error.message };
    }
};

const getDetailsProduct = async (productId) => {
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

const getAllType = async () => {
    try {
        const allTypes = await Product.distinct('type');
        return {
            status: 'OK',
            message: 'Success',
            data: allTypes,
        };
    } catch (error) {
        return { status: 'ERR', message: error.message };
    }
};

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    deleteManyProduct,
    getAllProduct,
    getDetailsProduct,
    getAllType,
};
