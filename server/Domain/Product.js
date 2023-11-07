const Image = require("./Image");
const Color = require("./Color");
const Comment = {
  title: String,
  stars: Number,
  text: String,
  writer: String,
  dateSubmited: String,
  likes: Number,
  disLikes: Number,
};

const Category = {
  title: String,
  image: Image,
  url: String,
};

const Tag = {
  title: String,
  link: String,
};
const Feature = {
  title: String,
  value: String,
};
const ProductModel = {
  title: String,
  link: Number,
  description: String,
  features: [Feature],
  tags: [Tag],
  images: [Image],
  comments: [Comment],
  ordered: Number,
  colors: [Color],
  price: String,
};

module.exports = ProductModel;
