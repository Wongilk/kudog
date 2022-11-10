const express = require("express");
const router = express.Router();
const { User } = require("../model/User");
const { auth } = require("../middleware/auth");
const { Product } = require("../model/Product");
const { Payment } = require("../model/Payment");
const { Order } = require("../model/Order");
const { smtpTransport } = require("../config/email");
const bcrypt = require("bcrypt");
const async = require("async");
router.post("/register", (req, res) => {
  //client에서의 회원가입 정보를 가져와 데이터베이스에 저장.
  const user = new User(req.body);
  //db에 저장
  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});
router.post("/login", (req, res) => {
  //email 존재 유무 확인
  User.findOne({ email: req.body.email }, (err, user) => {
    console.log(user);
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "해당 이메일에 해당하는 유저가 없습니다.",
      });
    }
    //존재 시 pwd가 맞는 지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다",
        });
      //맞다면 user를 위한 token 생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        //토큰을 cookie에 저장
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});
//auth : middleware 콜백 함수 실행 전 무언가를 해줌
router.get("/auth", auth, (req, res) => {
  //auth를 통과했으므로 인증 O
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    image: req.user.image,
    cart: req.user.cart,
    stamp: req.user.stamp,
    paymentHistory: req.user.paymentHistory,
    productHistory: req.user.productHistory,
    address: req.user.address,
  });
});

router.get("/logout", auth, (req, res) => {
  //user를 찾고 토큰을 지워줌
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({ success: true });
  });
});

router.post("/find_id", (req, res) => {
  console.log(req.body);
  User.findOne(
    {
      email: req.body.email,
      name: req.body.name,
    },
    (err, user) => {
      console.log(user);
      if (!user) {
        return res.json({
          findIdSuccess: false,
          message: "해당 이메일로 가입된 계정이 없습니다.",
        });
      } else return res.json({ findIdSuccess: true, user });
    }
  );
});

router.post("/find_password", (req, res) => {
  User.findOne(
    {
      email: req.body.email,
      name: req.body.name,
    },
    (err, user) => {
      if (!user) {
        return res.json({
          findIdSuccess: false,
          message: "해당 이메일로 가입된 계정이 없습니다.",
        });
      } else {
        const authNum =
          Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111;
        console.log(authNum);
        const mailOptions = {
          from: "wwwkim99@naver.com",
          to: req.body.email,
          subject: "[kudog]인증 관련 이메일 입니다",
          text: "오른쪽 숫자 6자리를 입력해주세요 : " + authNum,
        };
        console.log(mailOptions);

        smtpTransport.sendMail(mailOptions, (err, response) => {
          if (err) {
            console.log(err);
            return res.status(400).json({ success: false, err });
          } else {
            console.log("send!");
            smtpTransport.close();
            return res.status(200).json({ success: true, response, authNum });
          }
        });
      }
    }
  );
});
router.post("/reset_password", (req, res) => {
  bcrypt.genSalt(10, function (err, salt) {
    if (err) console.log(err);
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      if (err) console.log(err);
      else {
        User.findOneAndUpdate(
          { email: req.body.email },
          {
            $set: {
              password: hash,
            },
          },
          (err, userinfo) => {
            if (err) return res.status(400).json({ resetSuccess: false, err });
            else return res.status(200).json({ resetSuccess: true });
          }
        );
      }
      // Store hash in your password DB.
    });
  });
});

router.post("/addtocart", auth, (req, res) => {
  // *size정보 추가해줘야 함*
  //먼저 user 정보 가져오기
  User.findOne({ _id: req.user._id }, (err, userInfo) => {
    const date = new Date();
    //추가하려는 상품이 있는가
    let duplicate = false;
    userInfo.cart.forEach((item) => {
      if (item.id === req.body.productId && item.size === req.body.size) {
        duplicate = true;
      }
    });
    if (duplicate) {
      User.findOneAndUpdate(
        { _id: req.user._id, "cart.id": req.body.productId },
        { $inc: { "cart.$.quantity": 1 } },
        { new: true },
        (err, userInfo) => {
          if (err) return res.json({ success: false, err });
          return res
            .status(200)
            .send({ success: true, userInfoCart: userInfo.cart });
        }
      );
    }
    //없다면 추가
    else {
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            cart: {
              id: req.body.productId,
              date: date.toLocaleString("ko-kr"),
              quantity: 1,
              size: req.body.size,
            },
          },
        },
        //{new : true} => 업데이트 되고 나서의 정보를 받음
        { new: true },
        (err, userInfo) => {
          if (err) return res.json({ success: false, err });
          return res
            .status(200)
            .send({ success: true, userInfoCart: userInfo.cart });
        }
      );
    }
  });
});

router.get("/removecartitem", auth, (req, res) => {
  //db user cart에서 지워주고, cartDetail 재구성 해야함
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $pull: {
        cart: {
          id: req.query.id,
        },
      },
    },
    { new: true },
    (err, userInfo) => {
      let cart, arr;
      if (err) return res.status(400).send(err);
      else {
        cart = userInfo.cart;
        arr = cart.map((item) => {
          return item.id;
        });
      }

      Product.find({ _id: { $in: arr } })
        .populate("writer")
        .exec((err, productInfo) => {
          if (err) res.status(400).json({ success: false, err });
          else res.status(200).json({ productInfo, cart });
        });
    }
  );
});

router.post("/successbuy", auth, (req, res) => {
  //payment모델 payment 에 결제 정보 넣어주기, user stamp 채워주기  , user payment history에도 넣어주기
  const date = new Date();
  //payment 데이터랑 구입한 stamp 가격 만 넘어옴
  let history = [];
  let transactionData = {};
  history.push({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    paymentData: req.body.paymentData,
    dateofPurchase: date.toLocaleString("ko-kr"),
    price: req.body.product[1],
    stampNum: req.body.product[0],
  });
  transactionData.payment = history;
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $push: {
        paymentHistory: history,
      },
      $inc: {
        stamp: req.body.product[0],
      },
    },
    { new: true },
    (err, userInfo) => {
      if (err) return res.status(400).json({ success: false, err });
      const payment = new Payment(transactionData);
      payment.save((err, doc) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, doc, userInfo });
      });
    }
  );

  //1. user collection history에 간단한 결제 정보 넣어주기
  /*const date = new Date();
  let history = [];
  let transactionData = {};
  req.body.cartDetail.forEach((item) => {
    history.push({
      dateOfPurchase: date.toLocaleString("ko-kr"),
      productName: item.title,
      productId: item._id,
      price: item.price,
      quantity: item.quantity,
      orderID: req.body.paymentData.orderID,
    });
  });
  transactionData.user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  transactionData.data = req.body.paymentData;
  transactionData.product = history;

  User.findByIdAndUpdate(
    { _id: req.user._id },
    {
      $push: {
        history: history,
      },
      $set: {
        cart: [],
      },
    },
    { new: true },
    (err, userInfo) => {
      if (err) return res.json({ success: false, err });
      //2.payment collection 안에 자세한 결제 정보 넣어주기
      const payment = new Payment(transactionData);
      payment.save((err, doc) => {
        //doc은 payment에 저장된 정보
        if (err) return res.json({ success: false, err });

        //3.production collection sold 필드 업데이트 시켜주기
        //결제한 상품 id ,quantity 목록을 가져오고 db업데이트 => 하나 하나 찾고 조건 검색 = 번거로움 =>async 이용
        let products = [];
        doc.product.map((item) => {
          products.push({ productId: item.productId, quantity: item.quantity });
        });
        async.eachSeries(
          products,
          (item, callback) => {
            Product.findOneAndUpdate(
              { _id: item.productId },
              {
                $inc: {
                  sold: item.quantity,
                },
              },
              { new: false },
              callback
            );
          },
          (err, doc) => {
            if (err) return res.status(400).json({ success: false, err });
            return res
              .status(200)
              .json({ success: true, cart: userInfo.cart, cartDetail: [] });
          }
        );
      });
    }
  );*/
});
router.post("/orderproduct", auth, (req, res) => {
  //주문 정보 productHistory에 넣어주고 stamp 차감 , payment collection product에 추가
  //** 상품 여러개일때  처리**
  const date = new Date();
  let datas = [];
  console.log(req.body.cart);
  req.body.cart.map((item, index) => {
    datas[index] = {
      user_id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      address: req.user.address,

      brand: item.brand,
      productName: item.title,
      size: item.size,
      quantity: item.quantity,
      stamps: item.price,
      date: date.toLocaleString("ko-kr"),
    };
  });
  console.log(datas);
  let transactionData = {};

  transactionData.order = datas;
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $set: {
        cart: [],
        cartDetail: [],
      },
      $push: {
        productHistory: datas,
      },
      $inc: {
        stamp: -req.body.totalCost,
      },
    },
    { new: true },
    (err, userInfo) => {
      if (err) return res.status(400).json({ success: false, err });
      else {
        const order = new Order(transactionData);
        order.save((err, doc) => {
          if (err) return res.status(400).json({ success: false, err });
          else return res.status(200).json({ success: true, userInfo, doc });
        });
      }
    }
  );
});

router.post("/change_address", auth, (req, res) => {
  let address = req.body.address + "," + req.body.detailAddress;
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $set: {
        address: address,
      },
    },
    { new: true },
    (err, userInfo) => {
      if (err) return res.status(400).json({ success: false, err });
      else return res.status(200).json({ success: true, userInfo });
    }
  );
});
module.exports = router;
