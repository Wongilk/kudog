const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://wongilK:abcd1234@cluster0.hwhyn9y.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("mongo connected");
  })
  .catch((err) => console.log(err));
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port:${port}!`));
