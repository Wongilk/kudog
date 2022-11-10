const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    //상품명
    title: {
      type: String,
      maxlength: 50,
    },
    //stamp개수
    price: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
    },
    images: {
      type: Array,
      default: [],
    },
    sold: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    size: {
      type: Array,
      default: [],
    },
    category: {
      type: Array,
      default: [],
    },
    brand: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
productSchema.index(
  {
    title: "text",
    description: "text",
  },
  {
    weights: {
      title: 5,
      description: 1,
    },
  }
);
const Product = mongoose.model("Product", productSchema);

module.exports = { Product };
