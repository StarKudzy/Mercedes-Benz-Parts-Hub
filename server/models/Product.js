const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      enum: ["brakes", "engine", "electrical", "lighting", "other"],
      required: true
    },
    condition: {
      type: String,
      enum: ["new", "preowned"],
      required: true
    },
    image: {
      type: String,
      default: "images/pic01.jpg"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Product", productSchema);