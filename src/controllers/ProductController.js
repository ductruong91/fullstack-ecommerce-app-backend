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
    } = req.body;

    if (!userId || !name || !description || !price || !type|| !images || !stock) {
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

module.exports = {
  createProduct,
  updateProduct,
  detailProduct,
  deleteProduct,
};
