const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const User = require("./model/userSchema");
const Contact = require("./model/contact");
const Bill = require("./model/bill");
const Product = require("./model/product");
app.use("./asset", express.static("assets"));

dotenv.config({ path: "./config.env" });
require("./DB/conn");
// const User = require('./model/userSchema');

app.use(express.json());
//Linking Router file
app.use(require("./router/auth"));

const PORT = process.env.PORT;

app.get("/getUsers", (req, res) => {
  User.find()
    .then((USER) => res.json(USER))
    .catch((err) => res.json(err));
});

app.get("/getContact", (req, res) => {  
  Contact.find()
    .then((Contact) => res.json(Contact))
    .catch((err) => res.json(err));
});

app.get("/getBill", (req, res) => {
  Bill.find()
    .then((Bill) => res.json(Bill))
    .catch((err) => res.json(err));
});

app.get("/getProducts", (req, res) => {
  Product.find()
    .then((Product) => res.json(Product))
    .catch((err) => res.json(err));
});

app.get("/signin", (req, res) => {
  res.send("Login Page");
});

app.get("/signup", (req, res) => {
  res.send("Resister Page");
});

app.listen(PORT, (req, res) => {
  console.log(`Server Is Running At Port No ${PORT}`);
});

module.exports = app;
