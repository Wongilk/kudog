const express = require("express");
const router = express.Router();
const { Order } = require("../model/Order");
const { Review } = require("../model/Review");

//review저장하고   order table에 review true로
router.post("/store", (req, res) => {
  console.log(req.body);
  const review = new Review(req.body);
  review.save((err, Info) => {
    if (err) return res.status(400).json({ success: false, err });
    else {
      Order.findOneAndUpdate(
        {
          $and: [
            {
              order: {
                $elemMatch: {
                  selectItemId: req.body.selectItemId,
                },
              },
            }, //수정
            {
              order: {
                $elemMatch: {
                  $and: [
                    { brand: req.body.brand },
                    { size: req.body.size },
                    { productName: req.body.productName },
                  ],
                },
              },
            },
          ],
        },
        {
          $set: {
            "order.$.review": true,
          },
        },
        (err, orderInfo) => {
          if (err) return res.status(400).json({ success: false, err });
          else {
            return res.status(200).json({ success: true, orderInfo });
          }
        }
      );
    }
  });
});

router.post("/get_reviews", (req, res) => {
  console.log(req.body.product_id);
  if (req.body.product_id) {
    Review.find(
      {
        selectItemId: req.body.product_id,
      },
      (err, reviewInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        else {
          return res.status(200).json({ success: true, reviewInfo });
        }
      }
    );
  } else {
    Review.find({}, (err, reviewInfo) => {
      if (err) return res.status(400).json({ success: false, err });
      else {
        return res.status(200).json({ success: true, reviewInfo });
      }
    });
  }
});
module.exports = router;
