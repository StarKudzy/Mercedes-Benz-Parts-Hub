const Order = require("../models/Order");

// GET /api/orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error: error.message });
  }
};

// POST /api/orders
const createOrder = async (req, res) => {
  try {
    const { customerName, customerEmail, items, totalAmount, paymentStatus, paypalOrderId } = req.body;

    const order = await Order.create({
      customerName,
      customerEmail,
      items,
      totalAmount,
      paymentStatus: paymentStatus || "pending",
      paypalOrderId: paypalOrderId || ""
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: "Failed to create order", error: error.message });
  }
};

module.exports = {
  getOrders,
  createOrder
};