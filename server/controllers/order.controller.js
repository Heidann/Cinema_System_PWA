import Order from "../models/order.model.js";

/* Desc: get all orders
Route: GET /api/orders
Access: Protected */
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ where: { is_deleted: 0 } });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: get order by id
Route: GET /api/order/:id
Access: Protected */
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({ where: { id, is_deleted: 0 } });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: create a new order
Route: POST /api/order
Access: Protected */
const createOrder = async (req, res) => {
  try {
    const { user_id, total_price, promotion_code } = req.body;
    const newOrder = await Order.create({ user_id, total_price, status });
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: delete an order
Route: DELETE /api/order/:id
Access: Protected */
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({ where: { id, is_deleted: 0 } });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.is_deleted = 1;
    await order.save();
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllOrders, getOrderById, createOrder, deleteOrder };
