const Image = require("./Image");
const ProductModel = require("./Product");

const category = {
  name: String,
  image: Image,
  link: String,
};

const MainPage = {
  slider: [Image],
  categories: [Image],
  offerProducts: [Image],
};
module.exports = MainPage;
