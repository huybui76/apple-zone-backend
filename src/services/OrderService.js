const Order = require("../models/OrderModel");
const Product = require("../models/ProductModel");


const createOrder = async (newOrder) => {
  try {
    const {
      orderItems,
      shippingMethod
      ,
      itemsPrice,
      shippingPrice,
      totalPrice,
      fullName,
      address,
      phone,
    } = newOrder;

    if (
      !orderItems ||
      !shippingMethod
      ||
      !itemsPrice ||

      !totalPrice ||
      !fullName ||
      !phone
    ) {
      return {
        status: "ERR",
        message: "Missing required fields",
      };
    }

    // Check if the quantity of items in the order is sufficient
    const checkEnough = await Promise.all(orderItems.map(async (order) => {
      const productData = await Product.findOneAndUpdate(
        {
          _id: order.product,
          countInStock: { $gte: order.amount },
        },
        {
          $inc: {
            countInStock: -order.amount,
            sold: +order.amount,
          },
        },
        { new: true }
      );

      return productData
        ? { status: "OK", message: "SUCCESS" }
        : { status: "ERR", message: "ERR", id: order.product };
    }));

    const orderProduct = checkEnough.filter(item => item.id);
    if (orderProduct.length) {
      const arrId = orderProduct.map(item => item.id);
      return {
        status: "ERR",
        message: `San pham voi id: ${arrId.join(",")} khong du hang`,
      };
    } else {
      const createdOrder = await Order.create({
        orderItems,
        shippingAddress: {
          fullName,
          address,
          phone,
        },
        shippingMethod
        ,
        itemsPrice,
        shippingPrice,
        totalPrice,
      });

      return {
        status: 'OK',
        message: 'Order created successfully',
        data: createdOrder, // Return the created order data
      };
    }
  } catch (error) {
    return {
      status: "Error",
      message: error.message,
    };
  }
};


const getOrderByPhone = async (id) => {
  try {
    const order = await Order.find({
      'shippingAddress.phone': id,
    }).sort({ createdAt: -1, updatedAt: -1 });

    if (order.length === 0) {
      return {
        status: "ERR",
        message: "The order is not defined",
      };
    }

    return {
      status: "OK",
      message: "SUCESSS",
      data: order,
    };
  } catch (e) {
    return { status: 'ERR', message: error.message };
  }
};

const getOrderDetails = async (id) => {
  try {
    const order = await Order.findById({
      _id: id,
    });
    if (order === null) {
      resolve({
        status: "ERR",
        message: "The order is not defined",
      });
    }

    return {
      status: "OK",
      message: "SUCESSS",
      data: order,
    };
  } catch (e) {

    return { status: 'ERR', message: error.message };
  }
};

const cancelOrderDetails = async (id, data) => {
  try {
    const promises = data.map(async (orderItem) => {

      await Product.findOneAndUpdate(
        {
          _id: orderItem.product,
          sold: { $gte: orderItem.amount },
        },
        {
          $inc: {
            countInStock: +orderItem.amount,
            sold: -orderItem.amount,
          },
        },
        { new: true }
      );

      // if (!productData) {
      //   return {
      //     status: "ERR",
      //     message: `Product with id: ${orderItem.product} does not exist or has insufficient stock`,
      //   };
      // }

      const deletedOrder = await Order.findByIdAndDelete(id);

      if (!deletedOrder) {
        return {
          status: "ERR",
          message: "The order is not defined",
        };
      }

      return {
        status: "OK",
        message: "Delete Order Success",
        data: deletedOrder,
      };
    });

    const results = await Promise.all(promises);

    // Check if any product doesn't exist or has insufficient stock
    const errorResult = results.find((result) => result.status === "ERR");
    if (errorResult) {
      return errorResult;
    }

    // All operations were successful
    return {
      status: "OK",
      message: "Success delete order",
      data: results.map((result) => result.data),
    };
  } catch (error) {
    return { status: 'ERR', message: error.message };
  }
};


const getAllOrder = async () => {
  try {
    const allOrder = await Order.find().sort({
      createdAt: -1,
      updatedAt: -1,
    });
    return {
      status: "OK",
      message: "Success",
      data: allOrder,
    };
  } catch (e) {
    return { status: 'ERR', message: error.message };
  }
};

module.exports = {
  createOrder,
  getOrderByPhone,
  getOrderDetails,
  cancelOrderDetails,
  getAllOrder,
};
