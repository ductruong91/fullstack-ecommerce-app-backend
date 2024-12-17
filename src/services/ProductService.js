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

      await Product.findByIdAndDelete(id);

      resolve({
        status: "ok",
        message: "delete product success",
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getAllProduct = (limit = 8, page = 0, sort, filter) => {
  // console.log("filter", filter);
  return new Promise(async (resolve, reject) => {
    try {
      const totalProduct = await Product.countDocuments();
      //neu co filter
      if (filter) {
        console.log("okk");
        const label = filter[0];
        const totalProductFilter = await Product.countDocuments({
          [label]: { $regex: filter[1], $options: "i" },
        });

        const allProductFilter = await Product.find({
          [label]: { $regex: filter[1], $options: "i" },
        })
          .limit(limit)
          .skip(page * limit);

        resolve({
          status: "ok",
          message: "success get all product",
          data: allProductFilter,
          total: totalProductFilter,
          currentPage: Number(page + 1),
          totalPage: Math.ceil(totalProduct / limit),
        });
      }

      //neu co sort
      if (sort) {
        console.log("okk");
        const objectSort = {};
        objectSort[sort[1]] = sort[0];
        console.log("objectSort:", objectSort);

        const allProduct = await Product.find()
          .limit(limit)
          .skip(page * limit)
          .sort(objectSort);

        resolve({
          status: "ok",
          message: "success get all product",
          data: allProduct,
          total: totalProduct,
          currentPage: Number(page + 1),
          totalPage: Math.ceil(totalProduct / limit),
        });
      }

      const allProduct = await Product.find()
        .limit(limit)
        .skip(page * limit);

      resolve({
        status: "ok",
        message: "success get all product",
        data: allProduct,
        total: totalProduct,
        currentPage: Number(page + 1),
        totalPage: Math.ceil(totalProduct / limit),
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getUserProduct = (id, limit = 8, page = 0) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalProduct = await Product.countDocuments({
        userId: id,
      });
      const allProduct = await Product.find({
        userId: id,
      })
        .limit(limit)
        .skip(page * limit);

      resolve({
        status: "ok",
        message: "success to get all your product",
        data: allProduct,
        total: totalProduct,
        currentPage: Number(page + 1),
        totalPage: Math.ceil(totalProduct / limit),
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
  getAllProduct,
  getUserProduct,
};
