const mongoose = require("mongoose");
const user = require("../Domain/User");
const product = require("../Domain/Product");
const mainPageModel = require("../Domain/MainPage");
const fileStorageModel = require("../Domain/FileStorage");
const AutoIncrement = require("./AutoIncrementPlugin");

// mongoose.set("debug", true);
const Database = mongoose.connect("mongodb://127.0.0.1:27017/Digishop", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userModel = new mongoose.Schema(user.UserModel);
const productSchema = new mongoose.Schema(product);
const mainPage = new mongoose.Schema(mainPageModel);
const fileStorageModelSchema = new mongoose.Schema(fileStorageModel);

productSchema.plugin(AutoIncrement, { modelName: "_product", field: "link" });

const User = mongoose.model("User", userModel);
const Product = mongoose.model("Product", productSchema);
const MainPage = mongoose.model("MainPage", mainPage);
const FileStorage = mongoose.model("FileStorage", fileStorageModelSchema);

module.exports = { User, Product, MainPage, FileStorage };
