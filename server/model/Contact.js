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
  syncTime: {
    type: String,
    default: Date.now,
  },
});
const Contact = mongoose.model("Contact", contactSchema);
module.exports = { Contact };
