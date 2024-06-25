const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const dburl = process.env.mongodburl;
mongoose.connect(dburl).then(() => {
  console.log("Connected to DB Successfully");
}).catch((err) => {
  console.log(err.message);
});

const app = express();
app.use(express.json());
app.use(cors());

const userrouter = require("./routes/userroutes");

app.use("", userrouter);

const port = process.env.PORT || 2032;
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
