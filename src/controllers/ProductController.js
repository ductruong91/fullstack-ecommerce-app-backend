const JwtService = require("../services/JwtService");
const ProductService = require("../services/ProductService");

const createProduct = async (req, res) => {
  try {
    console.log(req.body); // Kiểm tra dữ liệu từ client
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
      owner,
    } = req.body;

    if (
      !userId ||
      !name ||
      !description ||
      !price ||
      !type ||
      !images ||
      !stock
    ) {
      return res.status(400).json({
        status: "ERR",
        message: "input í not required",
      });
    }
    const response = await ProductService.createProduct(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error.message || "An error occurred", // Trả lỗi kèm thông báo
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    console.log("productId:", productId);

    const data = req.body;

    if (!productId) {
      return res.status(200).json({
        status: "ERR",
        message: "productId khong co trong duong dan",
      });
    }

    const result = await ProductService.updateProduct(productId, data); // Gọi hàm và truyền req.body
    return res.status(200).json(result); // Gửi phản hồi với status 200 và dữ liệu trả về
  } catch (error) {
    return res.status(404).json({
      message: error.message || "An error occurred", // Trả lỗi kèm thông báo
    });
  }
};

const detailProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    if (!productId) {
      return res.status(200).json({
        status: "ERR",
        message: "khong ton tai sp",
      });
    }

    const result = await ProductService.detailProduct(productId); // Gọi hàm và truyền
    return res.status(200).json(result); // Gửi phản hồi với status 200 và dữ liệu trả về
  } catch (error) {
    return res.status(404).json({
      message: error.message || "An error occurred", // Trả lỗi kèm thông báo
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    if (!productId) {
      return res.status(200).json({
        status: "ERR",
        message: "khong co san pham",
      });
    }

    const result = await ProductService.deleteProduct(productId); // Gọi hàm và truyền req.body
    return res.status(200).json(result); // Gửi phản hồi với status 200 và dữ liệu trả về
  } catch (error) {
    return res.status(404).json({
      message: error.message || "An error occurred", // Trả lỗi kèm thông báo
    });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;
    console.log("filter", filter);

    let filterObject = {};

    // Chuyển filter mảng thành object
    if (Array.isArray(filter) && filter.length % 2 === 0) {
      for (let i = 0; i < filter.length; i += 2) {
        const key = filter[i];
        const value = filter[i + 1];
        filterObject[key] = value;
      }
    }

    const products = await ProductService.getAllProduct(
      Number(limit) || 8,
      Number(page) || 0,
      sort,
      filter
    );

    return res.status(200).json(products); // Gửi phản hồi với status 200 và dữ liệu trả về
  } catch (error) {
    return res.status(404).json({
      message: error.message || "An error occurred", // Trả lỗi kèm thông báo
    });
  }
};

const getUserProduct = async (req, res) => {
  try {
    const { limit, page } = req.query;
    const userId = req.params.id;
    console.log("useID", userId);

    let products;
    products = await ProductService.getUserProduct(
      userId,
      Number(limit) || 8,
      Number(page) || 0
    );

    return res.status(200).json(products); // Gửi phản hồi với status 200 và dữ liệu trả về
  } catch (error) {
    return res.status(404).json({
      message: error.message || "An error occurred", // Trả lỗi kèm thông báo
    });
  }
};

const getAllProductForAdmin = async (req, res) => {
  try {
    const products = await ProductService.getAllProductForAdmin();

    return res.status(200).json(products); // Gửi phản hồi với status 200 và dữ liệu trả về
  } catch (error) {
    return res.status(404).json({
      message: error.message || "An error occurred", // Trả lỗi kèm thông báo
    });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  detailProduct,
  deleteProduct,
  getAllProduct,
  getUserProduct,
  getAllProductForAdmin,
};
