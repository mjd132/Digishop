const mongoose = require("mongoose");
const Image = require("./Image");
const ProductModel = require("./Product");
const ReturnedOrder = {
  userOrder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  dateRegistered: String,
  products: [ProductModel],
};

const Order = {
  userOrder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  dateRegistered: String,
  status: {
    type: String,
    enum: ["processed", "notProcess", "processing"],
  },
  sumPrices: String,
  sumProducts: String,
  products: [ProductModel],
  code: String,
};

// const feature={
//   title
// }

const Address = {
  address: String,
  postCode: {
    type: String,
    validate: {
      validator: function (v) {
        var re = /\b(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}\b/gm;
        return !v || !v.trim().length || re.test(v);
      },
      message: "postcode invalid",
    },
  },
};
// const MainPageModel = {
//   ImagesSlider: [Image],
//   Categories: [Category],
// };
const ProfileModel = {
  name: String,
  family: String,
  mobile: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  email: {
    type: String,
    required: false,
    unique: true,
    lowercase: true,
    trim: true,
    sparse: true,
  },
  password: {
    type: String,
    required: true,
  },
  birthday: String,
  profileImage: Image,
};
const itemCart = {
  productId: Number,
  productName: String,
  count: Number,
};
const UserModel = {
  role: { type: String, enum: ["user", "admin"], default: "user" },
  orders: [Order],
  returnedOrders: [ReturnedOrder],
  faverites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  addresses: [Address],
  profile: ProfileModel,
  cart: [itemCart],
};
module.exports = { UserModel, ProfileModel, ProductModel };
