const express = require("express");
const router = express.Router();
const { Payment } = require("../model/Payment");
const { Order } = require("../model/Order");
const { User } = require("../model/User");
const { auth } = require("../middleware/auth");

router.post("/get_payments", auth, (req, res) => {
  Payment.find(
    { payment: { $elemMatch: { _id: req.user._id } } },
    (err, paymentInfo) => {
      if (err) return res.status(400).json({ success: false, err });
      else return res.status(200).json({ success: true, paymentInfo });
    }
  );
});
module.exports = router;
