const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = mongoose.Schema({
  writer: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  content: {
    type: String,
  },
  date: {
    type: String,
    // 요거
    default: new Date().toLocaleString("ko-kr"),
  },
});
const Contact = mongoose.model("Contact", contactSchema);
module.exports = { Contact };
