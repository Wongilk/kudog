const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const { User } = require("./model/User");
const bodyParser = require("body-parser");
const config = require("./config/key");

// .urlencoded()는 application/x-www-form-urlencoded형태 데이터 해석
app.use(bodyParser.urlencoded({ extended: true }));
// .json()은 application/json형태의 데이터를 해석
app.use(bodyParser.json());

mongoose
  .connect(config.mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log("mongo connected");
  })
  .catch((err) => console.log(err));
app.get("/", (req, res) => res.send("Hello World! It's changing"));
app.post("/register", (req, res) => {
  //client에서의 회원가입 정보를 가져와 데이터베이스에 저장.
  const user = new User(req.body);
  //db에 저장
  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});
app.listen(port, () => console.log(`Example app listening on port:${port}!`));
