const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config/key");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/users");
const orderRoute = require("./routes/orders");
const productRoute = require("./routes/products");
const paymentRoute = require("./routes/payments");
//cors = client가 도메인이나 포트가 다른 서버로 요청했을 때 api차단
const cors = require("cors");

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

if (process.env.NODE_ENV === "production") {
  // Set static folder
  // All the javascript and css files will be read and served from this folder
  app.use(express.static("client/build"));

  // index.html for all page routes    html or routing and naviagtion
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

app.use(cors());
//가상경로 uploads, express.static('uploads')=>uploads디렉토리에 정적인 파일 존재 :localhost:3000/uploads/~~~로 접근
app.use("/uploads", express.static("uploads"));
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/payments", paymentRoute);
app.listen(port, () => console.log(`Example app listening on port:${port}!`));
