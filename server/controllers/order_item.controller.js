import OrderItem from "../models/order_item.model.js";

/* Desc: get all order items
Route: GET /api/order_items
Access: Protected */
const getAllOrderItems = async (req, res) => {
  try {
    const orderItems = await OrderItem.findAll({ where: { is_deleted: 0 } });
    res.json(orderItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: get order item by id
Route: GET /api/order_item/:id
Access: Protected */
const getOrderItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const orderItem = await OrderItem.findOne({ where: { id, is_deleted: 0 } });
    if (!orderItem) {
      return res.status(404).json({ message: "Order item not found" });
    }
    res.json(orderItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: create a new order item
Route: POST /api/order_item
Access: Protected */
const createOrderItem = async (req, res) => {
  try {
    const { order_id, item_type, item_id, quantity, price } = req.body;
    const newOrderItem = await OrderItem.create({
      order_id,
      item_type,
      item_id,
      quantity,
      price,
    });
    res.status(201).json(newOrderItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: update an order item
Route: PUT /api/order_item/:id
Access: Protected */
const updateOrderItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { order_id, item_type, item_id, quantity, price } = req.body;
    const [updatedRows] = await OrderItem.update(
      { order_id, item_type, item_id, quantity, price },
      { where: { id, is_deleted: 0 } }
    );
    if (updatedRows === 0) {
      return res.status(404).json({ message: "Order item not found" });
    }
    const updatedOrderItem = await OrderItem.findOne({ where: { id } });
    res.json(updatedOrderItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: delete an order item
Route: DELETE /api/order_item/:id
Access: Protected */
const deleteOrderItem = async (req, res) => {
  try {
    const { id } = req.params;
    const [updatedRows] = await OrderItem.update(
      { is_deleted: 1 },
      { where: { id, is_deleted: 0 } }
    );
    if (updatedRows === 0) {
      return res.status(404).json({ message: "Order item not found" });
    }
    res.json({ message: "Order item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllOrderItems,
  getOrderItemById,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
};
