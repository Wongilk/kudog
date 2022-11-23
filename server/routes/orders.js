const express = require("express");
const router = express.Router();
const { Order } = require("../model/Order");
const { auth } = require("../middleware/auth");

router.post("/get_orders", auth, (req, res) => {
  Order.find(
    { order: { $elemMatch: { user_id: req.user.id } } },
    (err, orderInfo) => {
      console.log(orderInfo);
      if (err) return res.status(400).json({ success: false, err });
      else return res.status(200).json({ success: true, orderInfo });
    }
  );
});

router.post("/get_not_deliver_check", (req, res) => {
  Order.find(
    { order: { $elemMatch: { dateOfReturn: "" } } },
    (err, orderInfo) => {
      if (err) return res.status(400).json({ success: false, err });
      else return res.status(200).json({ success: true, orderInfo });
    }
  );
});

router.post("/deliver_check", (req, res) => {
  let orderInfo = req.body.orderInfo;
  console.log(orderInfo);
  let date = new Date();
  date.setDate(date.getDate() + 7);
  orderInfo.map((item) => (item.dateOfReturn = date.toLocaleString("ko-kr")));
  Order.findOneAndUpdate(
    {
      _id: req.body.order_id,
    },
    {
      $set: {
        order: orderInfo,
      },
    },
    { new: true },
    (err, newOrderInfo) => {
      if (err) return res.status(400).json({ success: false, err });
      else {
        return res.status(200).json({ success: true, newOrderInfo });
      }
    }
  );
});

module.exports = router;
