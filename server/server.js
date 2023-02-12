const express = require("express");
const cors = require("cors");
const connection = require("./connection");
const auth = require("./auth");
const bodyParser = require("body-parser");
const verify = require("./verify");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("dotenv").config();

app.use(express.json());
app.use(cors());

connection();

app.use("/login", auth);
app.use("/verify", verify);

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
  if (!err) {
    console.log(`Server started on port ${port}`);
  } else {
    console.log(err);
  }
});
