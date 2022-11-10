const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = mongoose.Schema(
  {
    payment: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = { Payment };
