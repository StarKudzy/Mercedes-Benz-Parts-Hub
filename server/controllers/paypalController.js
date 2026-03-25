const Order = require("../models/Order");
const Product = require("../models/Product");

const PAYPAL_BASE = "https://api-m.sandbox.paypal.com";

async function getAccessToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  console.log("PAYPAL_CLIENT_ID exists:", !!clientId);
  console.log("PAYPAL_CLIENT_SECRET exists:", !!clientSecret);

  if (!clientId || !clientSecret) {
    throw new Error("Missing PayPal environment variables");
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "grant_type=client_credentials"
  });

  const tokenText = await res.text();
  console.log("TOKEN STATUS:", res.status);
  console.log("TOKEN RAW:", tokenText);

  let tokenData;
  try {
    tokenData = JSON.parse(tokenText);
  } catch {
    throw new Error("PayPal token response was not valid JSON");
  }

  if (!res.ok) {
    throw new Error(
      tokenData.error_description ||
      tokenData.error ||
      "Failed to get PayPal access token"
    );
  }

  return tokenData.access_token;
}

exports.createPayPalOrder = async (req, res) => {
  try {
    console.log("=== CREATE PAYPAL ORDER HIT ===");
    console.log("REQ BODY:", req.body);

    const { cart } = req.body;

    if (!Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const total = cart.reduce((sum, item) => {
      return sum + (Number(item.price || 0) * Number(item.quantity || 0));
    }, 0);

    console.log("CALCULATED TOTAL:", total);

    if (total <= 0) {
      return res.status(400).json({ message: "Invalid cart total" });
    }

    const accessToken = await getAccessToken();
    console.log("ACCESS TOKEN RECEIVED");

    const paypalPayload = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: total.toFixed(2)
          }
        }
      ]
    };

    console.log("PAYPAL PAYLOAD:", JSON.stringify(paypalPayload, null, 2));

    const paypalRes = await fetch(`${PAYPAL_BASE}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(paypalPayload)
    });

    const orderText = await paypalRes.text();
    console.log("PAYPAL ORDER STATUS:", paypalRes.status);
    console.log("PAYPAL ORDER RAW:", orderText);

    let orderData;
    try {
      orderData = JSON.parse(orderText);
    } catch {
      throw new Error("PayPal order response was not valid JSON");
    }

    if (!paypalRes.ok) {
      return res.status(400).json({
        message: "Failed to create PayPal order",
        error: orderData
      });
    }

    return res.json(orderData);
  } catch (error) {
    console.error("CREATE PAYPAL ORDER ERROR:", error);
    return res.status(500).json({
      message: "Failed to create PayPal order",
      error: error.message
    });
  }
};

exports.capturePayPalOrder = async (req, res) => {
  try {
    const { orderID, customerName, customerEmail, items } = req.body;

    if (!orderID) {
      return res.status(400).json({ message: "Missing PayPal order ID" });
    }

    if (!customerName || !customerEmail) {
      return res.status(400).json({
        message: "Customer name and email are required"
      });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Order items are required" });
    }

    const accessToken = await getAccessToken();

    const paypalRes = await fetch(
      `${PAYPAL_BASE}/v2/checkout/orders/${orderID}/capture`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    const captureText = await paypalRes.text();
    console.log("CAPTURE STATUS:", paypalRes.status);
    console.log("CAPTURE RAW:", captureText);

    let captureData;
    try {
      captureData = JSON.parse(captureText);
    } catch {
      throw new Error("PayPal capture response was not valid JSON");
    }

    if (!paypalRes.ok) {
      return res.status(400).json({
        message: "PayPal capture failed",
        error: captureData
      });
    }

    const processedItems = [];
    let totalAmount = 0;

    for (const item of items) {
      if (!item.product || !item.quantity || item.quantity < 1) {
        return res.status(400).json({
          message: "Each item must include a product ID and quantity"
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
      paymentStatus: "paid",
      paypalOrderId: orderID
    });

    return res.status(201).json(order);
  } catch (error) {
    console.error("CAPTURE PAYPAL ORDER ERROR:", error);
    return res.status(500).json({
      message: "Failed to capture PayPal order",
      error: error.message
    });
  }
};