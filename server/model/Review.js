const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = mongoose.Schema(
  {
    writer: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    date: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "",
    },
    brand: {
      type: String,
      default: "",
    },
    productName: {
      type: String,
      default: "",
    },
    images: {
      type: Array,
      default: [],
    },
    selectItemId: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = { Review };
//리뷰
