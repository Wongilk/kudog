const express = require("express");
const router = express.Router();
const { Order } = require("../model/Order");
const { auth } = require("../middleware/auth");
const { Product } = require("../model/Product");

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
router.post("/get_all_orders", (req, res) => {
  Order.find({}, (err, orderInfo) => {
    if (err) return res.status(400).json({ success: false, err });
    else return res.status(200).json({ success: true, orderInfo });
  });
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
//수정 해야됨
router.post("/deliver_check", (req, res) => {
  let orderInfo = req.body.orderInfo;
  console.log(orderInfo);
  let date = new Date();
  date.setDate(date.getDate() + 7);
  Order.findOneAndUpdate(
    {
      $and: [
        {
          _id: req.body.order_id,
        },
        {
          order: {
            $elemMatch: {
              selectItemId: orderInfo.selectItemId,
            },
          },
        },
      ],
    },
    {
      $set: {
        "order.$.dateOfReturn": date.toLocaleString("ko-kr"),
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

router.post("/return_check", (req, res) => {
  let orderInfo = req.body.orderInfo;
  console.log(orderInfo.selectItemId);
  Order.findOneAndUpdate(
    {
      $and: [
        {
          _id: req.body.order_id,
        },
        {
          order: {
            $elemMatch: {
              selectItemId: orderInfo.selectItemId,
            },
          },
        },
      ],
    },
    {
      $set: {
        "order.$.isReturned": true,
      },
    },
    { new: true },
    (err, newOrderInfo) => {
      if (err) return res.status(400).json({ success: false, err });
      else {
        //상품 수량 추가
        Product.findOneAndUpdate(
          {
            $and: [
              { _id: orderInfo.selectItemId },
              {
                sizeAndQuantity: {
                  $elemMatch: {
                    size: orderInfo.size,
                  },
                },
              },
            ],
          },
          {
            $inc: {
              "sizeAndQuantity.$.quantity": orderInfo.quantity,
            },
          },
          { new: true },
          (err, productInfo) => {
            if (err) return res.status(400).json({ success: false, err });
            else
              return res
                .status(200)
                .json({ success: true, newOrderInfo, productInfo });
          }
        );
      }
    }
  );
});

module.exports = router;
// 수정 for 반납
