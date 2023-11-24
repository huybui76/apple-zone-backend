const Order = require("../models/OrderModel");
const Product = require("../models/ProductModel");
const EmailService = require("../services/EmailService");

const createOrder = async (newOrder) => {
  try {
    const {
      orderItems,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      fullName,
      address,
      city,
      phone,
      user,
      isPaid,
      paidAt,
      email,
    } = newOrder;
    if (
      !orderItems ||
      !paymentMethod ||
      !itemsPrice ||
      !shippingPrice ||
      !totalPrice ||
      !fullName ||
      !city ||
      !phone ||
      !user ||
      !isPaid ||
      !paidAt ||
      !email
    ) {
      return {
        status: "ERR",
        message: "Missing required fields",
      };
    }

    // Kiểm tra xem số lượng đon hàng đủ cung cấp không
    const checkEnough = orderItems.map(async (order) => {
      const productData = await Product.findOneAndUpdate(
        {
          _id: order.product,
          countInStock: { $gte: order.amount },
        },
        {
          $inc: {
            countInStock: -order.amount,
            selled: +order.amount,
          },
        },
        { new: true }
      );
      if (productData) {
        return {
          status: "OK",
          message: "SUCCESS",
        };
      } else {
        return {
          status: "Err",
          message: "ERR",
          id: order.product,
        };
      }
    });

    const results = await Promise.all(checkEnough);
    const orderProduct = results && results.filter((item) => item.id);
    if (orderProduct.length) {
      const arrId = [];
      newData.forEach((item) => {
        arrId.push(item.id);
      });
      resolve({
        status: "ERR",
        message: `San pham voi id: ${arrId.join(",")} khong du hang`,
      });
    } else {
      const createOrder = await Order.create({
        orderItems,
        shippingAddress: {
          fullName,
          address,
          //city,
          phone,
        },
        //paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice,
        user: user,
        //isPaid,
        //paidAt,
      });
      if (createOrder) {
        //await EmailService.sendEmailCreateOrder(email, orderItems);
        resolve({
          status: "OK",
          message: "success",
        });
      }
    }
  } catch (error) {
    return {
      status: "Error",
      message: error.message,
    };
  }
};

const getAllOrderDetails = async (id) => {
  try {
    const order = await Order.find({
      user: id,
    }).sort({ createdAt: -1, updatedAt: -1 });
    if (order === null) {
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
    // console.log('e', e)
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
    // console.log('e', e)
    return { status: 'ERR', message: error.message };
  }
};

const cancelOrderDetails = async (id, data) => {
  try {
    let order = [];
    const promises = data.map(async (order) => {
      const productData = await Product.findOneAndUpdate(
        {
          _id: order.product,
          selled: { $gte: order.amount },
        },
        {
          $inc: {
            countInStock: +order.amount,
            selled: -order.amount,
          },
        },
        { new: true }
      );
      if (productData) {
        order = await Order.findByIdAndDelete(id);
        if (order === null) {
          return {
            status: "ERR",
            message: "The order is not defined",
          };
        }
      } else {
        return {
          status: "OK",
          message: "ERR",
          id: order.product,
        };
      }
    });
    const results = await Promise.all(promises);
    const newData = results && results[0] && results[0].id;

    if (newData) {
      return {
        status: "ERR",
        message: `San pham voi id: ${newData} khong ton tai`,
      };
    }
    return {
      status: "OK",
      message: "success",
      data: order,
    };
  } catch (e) {
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
  getAllOrderDetails,
  getOrderDetails,
  cancelOrderDetails,
  getAllOrder,
};
