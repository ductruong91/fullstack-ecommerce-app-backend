const Product = require("../models/ProductModel");
const bcrypt = require("bcrypt");
const { generalAccessToken, generalRefreshToken } = require("./JwtService");

const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const {
      userId,
      name,
      description,
      price,
      type,
      images,
      stock,
      sold,
      reviews,
      rating,
    } = newProduct;

    try {
      //tao user va dua vao trong databases
      const newProduct = await Product.create({
        userId,
        name,
        description,
        price,
        type,
        images,
        stock,
        sold,
        reviews,
        rating,
      });

      //tra ket qua
      if (newProduct) {
        resolve({
          status: "ok",
          message: "success",
          data: newProduct,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const updateProduct = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id,
      });

      // kiem tra xem id co ton tai sp nao khong da ton tai chua
      if (checkProduct === null) {
        resolve({
          status: "ok",
          message: " id sp khong ton tai",
        });
      }

      const updatedProduct = await Product.findByIdAndUpdate(id, data, {
        new: true,
      });
      //{new:true} tra ve doc sau khi cap nhat

      resolve({
        status: "ok",
        message: "ud success",
        data: updatedProduct,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const detailProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findOne({
        _id: id,
      });

      if (product === null) {
        resolve({
          status: "ok",
          message: " khong co sp",
        });
      }

      resolve({
        status: "ok",
        message: " success get data",
        data: product,
      });
    } catch (error) {
      reject(error);
    }
  });
};


const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id,
      });

      // kiem tra xem id co ton tai ng nao khong da ton taij chua
      if (checkProduct === null) {
        resolve({
          status: "ok",
          message: " id product khong ton tai",
        });
      }

    //   await Product.findByIdAndDelete(id);

      resolve({
        status: "ok",
        message: "delete product success",
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createProduct,
  updateProduct,
  detailProduct,
  deleteProduct,
};
