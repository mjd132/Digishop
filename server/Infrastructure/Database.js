const mongoose = require("mongoose");
const user = require("../Domain/User");
const product = require("../Domain/Product");
const mainPageModel = require("../Domain/MainPage");
// const colorModel = require('../Domain/Color')

const Database = mongoose.connect("mongodb://127.0.0.1:27017/Digishop", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userModel = new mongoose.Schema(user.UserModel);
const productSchema = new mongoose.Schema(product);
const mainPage = new mongoose.Schema(mainPageModel);

const User = mongoose.model("User", userModel);
const Product = mongoose.model("Product", productSchema);
const MainPage = mongoose.model("MainPage", mainPage);
// const Color = mongoose.model("Color",new mongoose.Schema(colorModel))

module.exports = { User, Product, MainPage };
