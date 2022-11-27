const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Product } = require("../model/Product");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
let upload = multer({ storage: storage }).single("file");

router.post("/image", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    } else {
      return res.json({
        success: true,
        fileName: res.req.file.filename,
        filePath: res.req.file.path,
      });
    }
  });
});
//상품 업로드
router.post("", (req, res) => {
  const product = new Product(req.body);
  console.log(product);
  product.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    else return res.status(200).json({ success: true });
  });
});

router.post("/getproducts", (req, res) => {
  //product 내 모든 정보를 가져옴 find() , populate() : 그 태그에 해당하는 모든 요소 가져옴
  let limit = req.body.limit;
  let skip = req.body.skip;
  //req.body.filters = Filters , key = brand or category
  let searchWord = req.body.searchWord;
  let findArg = {};
  console.log(req.body.filters);
  //findArg 구성
  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "gender" && req.body.filters[key] === "ALL") {
      } else findArg[key] = req.body.filters[key];
    }
  }
  //console.log(findArg);
  // 검색어로 검색 시
  if (searchWord) {
    Product.find(findArg)
      .find({ $text: { $search: searchWord } })
      .populate("writer")
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if (err) res.status(400).json({ success: false, err });
        else {
          console.log(productInfo);
          return res.status(200).json({
            success: true,
            productInfo,
            postSize: productInfo.length,
          });
        }
      });
  } else {
    Product.find(findArg)
      .populate("writer")
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if (err) res.status(400).json({ success: false, err });
        else
          return res.status(200).json({
            success: true,
            productInfo,
            postSize: productInfo.length,
          });
      });
  }
});

//product id로 검색
router.get("/product_by_id", (req, res) => {
  let type = req.query.type;
  let productIds = req.query.id;
  if (type === "array") {
    let ids = req.query.id.split(",");
    //배열로 만듬
    productIds = ids.map((item) => {
      return item;
    });
  }
  Product.find({ _id: { $in: productIds } })
    .populate("writer")
    .exec((err, productInfo) => {
      if (err) res.status(400).json({ success: false, err });
      else res.status(200).send(productInfo);
    });
});
router.post("/get_all", (req, res) => {
  Product.find()
    .populate("writer")
    .exec((err, productInfo) => {
      if (err) res.status(400).json({ success: false, err });
      else res.status(200).send(productInfo);
    });
});

router.post("/remove_product", (req, res) => {
  Product.deleteOne({ _id: req.body.productId })
    .populate("writer")
    .exec((err, productInfo) => {
      if (err) res.status(400).json({ success: false, err });
      else res.status(200).send({ success: true });
    });
});

module.exports = router;
//수정
