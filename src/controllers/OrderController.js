const JwtService = require("../services/JwtService");
const OrderService = require("../services/OrderService");

const createOrder = async (req, res) => {
  try {
    console.log(req.body); // Kiểm tra dữ liệu từ client
    const response = await OrderService.createOrder(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error.message || "An error occurred", // Trả lỗi kèm thông báo
    });
  }
};

const updateOrderById = async (req, res) => {
  try {
    const OrderId = req.params.id;
    console.log("OrderId:", OrderId);

    const data = req.body;

    if (!OrderId) {
      return res.status(200).json({
        status: "ERR",
        message: "Id khong co trong duong dan",
      });
    }

    const result = await OrderService.updateOrderById(OrderId, data); // Gọi hàm và truyền req.body
    return res.status(200).json(result); // Gửi phản hồi với status 200 và dữ liệu trả về
  } catch (error) {
    return res.status(404).json({
      message: error.message || "An error occurred", // Trả lỗi kèm thông báo
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const OrderId = req.params.id;

    if (!OrderId) {
      return res.status(200).json({
        status: "ERR",
        message: "khong ton tai sp",
      });
    }

    const result = await OrderService.getOrderById(OrderId); // Gọi hàm và truyền
    return res.status(200).json(result); // Gửi phản hồi với status 200 và dữ liệu trả về
  } catch (error) {
    return res.status(404).json({
      message: error.message || "An error occurred", // Trả lỗi kèm thông báo
    });
  }
};

const deleteOrderById = async (req, res) => {
  try {
    const OrderId = req.params.id;

    if (!OrderId) {
      return res.status(200).json({
        status: "ERR",
        message: "khong co san pham",
      });
    }

    const result = await OrderService.deleteOrderById(OrderId); // Gọi hàm và truyền req.body
    return res.status(200).json(result); // Gửi phản hồi với status 200 và dữ liệu trả về
  } catch (error) {
    return res.status(404).json({
      message: error.message || "An error occurred", // Trả lỗi kèm thông báo
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderService.getAllOrders();

    return res.status(200).json(orders); // Gửi phản hồi với status 200 và dữ liệu trả về
  } catch (error) {
    return res.status(404).json({
      message: error.message || "An error occurred", // Trả lỗi kèm thông báo
    });
  }
};

const getBuyUserOrders = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("useID", userId);

    let orders;
    orders = await OrderService.getBuyUserOrders(userId);

    return res.status(200).json(orders); // Gửi phản hồi với status 200 và dữ liệu trả về
  } catch (error) {
    return res.status(404).json({
      message: error.message || "An error occurred", // Trả lỗi kèm thông báo
    });
  }
};

const getSellUserOrders = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("useID sell", userId);

    let orders;
    orders = await OrderService.getSellUserOrders(userId);

    return res.status(200).json(orders); // Gửi phản hồi với status 200 và dữ liệu trả về
  } catch (error) {
    return res.status(404).json({
      message: error.message || "An error occurred", // Trả lỗi kèm thông báo
    });
  }
};


module.exports = {
  getOrderById,
  getAllOrders,
  getBuyUserOrders,
  getSellUserOrders,
  updateOrderById,
  createOrder,
  deleteOrderById,
};
