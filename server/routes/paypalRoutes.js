const express = require("express");
const router = express.Router();
const {
  createPayPalOrder,
  capturePayPalOrder
} = require("../controllers/paypalController");

router.post("/create-order", createPayPalOrder);
router.post("/capture-order", capturePayPalOrder);

module.exports = router;