const Order = require("../models/OrderModel");
const bcrypt = require("bcryptjs");
const { generalAccessToken, generalRefreshToken } = require("./JwtService");

const createOrder = (newOrder) => {
  return new Promise(async (resolve, reject) => {
    //chua kiem tra du lieu dau vao
    try {
      const newCreatedOrder = await Order.create(newOrder);

      //tra ket qua
      if (newCreatedOrder) {
        resolve({
          status: "ok",
          message: "success",
          data: newCreatedOrder,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const updateOrderById = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkOrder = await Order.findOne({
        _id: id,
      });

      // kiem tra xem id co ton tai sp nao khong da ton tai chua
      if (checkOrder === null) {
        resolve({
          status: "ok",
          message: " id order khong ton tai",
        });
      }

      const updatedOrder = await Order.findByIdAndUpdate(id, data, {
        new: true,
      });
      //{new:true} tra ve doc sau khi cap nhat

      resolve({
        status: "ok",
        message: "ud success",
        data: updatedOrder,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getOrderById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.findOne({
        _id: id,
      });

      if (order === null) {
        resolve({
          status: "ok",
          message: " khong co sp",
        });
      }

      resolve({
        status: "ok",
        message: " success get data",
        data: order,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const deleteOrderById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkOrder = await Order.findOne({
        _id: id,
      });

      // kiem tra xem id co ton tai ng nao khong da ton taij chua
      if (checkOrder === null) {
        resolve({
          status: "ok",
          message: " id order khong ton tai",
        });
      }

      await Order.findByIdAndDelete(id);

      resolve({
        status: "ok",
        message: "delete order success",
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getAllOrders = () => {
  // console.log("filter", filter);
  return new Promise(async (resolve, reject) => {
    try {
      const totalOrder = await Order.countDocuments();

      const allOrder = await Order.find();

      resolve({
        status: "ok",
        message: "success get all order",
        data: allOrder,
        total: totalOrder,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getBuyUserOrders = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalOrder = await Order.countDocuments({
        buyerId: id,
      });
      const allOrder = await Order.find({
        buyerId: id,
      });

      resolve({
        status: "ok",
        message: "success to get all your order",
        data: allOrder,
        total: totalOrder,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getSellUserOrders = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalOrder = await Order.countDocuments({
        sellerId: id,
      });
      const allOrder = await Order.find({
        sellerId: id,
      });

      resolve({
        status: "ok",
        message: "success to get all your order",
        data: allOrder,
        total: totalOrder,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getAllOrdersPopulate = () => {
  // console.log("filter", filter);
  return new Promise(async (resolve, reject) => {
    try {
      const totalOrder = await Order.countDocuments();

      const allOrder = await Order.find()
        .populate("buyerId") // Lấy thông tin buyer
        .populate("sellerId"); // Lấy thông tin seller;

      resolve({
        status: "ok",
        message: "success get all order",
        data: allOrder,
        total: totalOrder,
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createOrder,
  updateOrderById,
  getOrderById,
  deleteOrderById,
  getAllOrders,
  getBuyUserOrders,
  getSellUserOrders,
  getAllOrdersPopulate,
};
