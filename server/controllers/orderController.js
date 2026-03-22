const Order = require("../models/Order");
const Product = require("../models/Product");

// GET /api/orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message
    });
  }
};

// POST /api/orders
const createOrder = async (req, res) => {
  try {
    const { customerName, customerEmail, items, paymentStatus, paypalOrderId } = req.body;

    if (!customerName || !customerEmail) {
      return res.status(400).json({
        message: "Customer name and email are required"
      });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "Order items are required"
      });
    }

    let totalAmount = 0;
    const processedItems = [];

    for (const item of items) {
      if (!item.product || !item.quantity || item.quantity < 1) {
        return res.status(400).json({
          message: "Each item must include a product ID and a quantity of at least 1"
        });
      }

      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({
          message: `Product not found: ${item.product}`
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${product.name}. Available: ${product.stock}`
        });
      }

      product.stock -= item.quantity;
      await product.save();

      processedItems.push({
        product: product._id,
        name: product.name,
        image: product.image || "images/pic01.jpg",
        quantity: item.quantity,
        price: product.price
      });

      totalAmount += product.price * item.quantity;
    }

    const order = await Order.create({
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim(),
      items: processedItems,
      totalAmount,
      paymentStatus: paymentStatus || "pending",
      paypalOrderId: paypalOrderId || ""
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);
    res.status(500).json({
      message: "Failed to create order",
      error: error.message
    });
  }
};



module.exports = {
  getOrders,
  createOrder
};