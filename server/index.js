const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const { User } = require("./model/User");
const bodyParser = require("body-parser");
const config = require("./config/key");
const cookieParser = require("cookie-parser");
const { auth } = require("./middleware/auth");

// .urlencoded()는 application/x-www-form-urlencoded형태 데이터 해석
app.use(bodyParser.urlencoded({ extended: true }));
// .json()은 application/json형태의 데이터를 해석
app.use(bodyParser.json());
app.use(cookieParser());
mongoose
  .connect(config.mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log("mongo connected");
  })
  .catch((err) => console.log(err));
app.get("/", (req, res) => res.send("Hello World! It's changing"));

app.post("/api/users/register", (req, res) => {
  //client에서의 회원가입 정보를 가져와 데이터베이스에 저장.
  const user = new User(req.body);
  //db에 저장
  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});
app.post("/api/users/login", (req, res) => {
  //email 존재 유무 확인
  User.findOne({ email: req.body.email }, (err, user) => {
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
app.get("/api/users/auth", auth, (req, res) => {
  //auth를 통과했으므로 인증 O
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    image: req.user.image,
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  //user를 찾고 토큰을 지워줌
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({ success: true });
  });
});
app.listen(port, () => console.log(`Example app listening on port:${port}!`));
