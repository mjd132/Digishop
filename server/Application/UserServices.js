const Database = require("../Infrastructure/Database");
const User = Database.User;

async function createUser(user) {
  return await User.create(user)
    .then((user) => {
      return user;
    })
    .catch((err) => {
      return err;
    });
}
async function getAllUsers() {
  return await User.find()
    .then((users) => {
      return users;
    })
    .catch((err) => {
      return err;
    });
}
async function updateUser(newProps, _id) {
  await User.findOneAndUpdate({ _id: _id }, newProps);
}
async function getUser(mobile) {
  return await User.findOne({ "profile.mobile": mobile })
    .then((user) => {
      return user;
    })
    .catch((err) => {
      return err;
    });
}
async function isExistUser(mobile) {
  return await User.exists({ "profile.mobile": mobile })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
}
async function getUserById(id) {
  return await User.findById(id)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
}
async function editProfile(userId, profile) {
  return await User.findByIdAndUpdate(userId, { $set: { profile } })
    .then((res) => {
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}
async function addToCart(userId, item) {
  return await User.findByIdAndUpdate(
    userId,
    { $push: { cart: item } },
    { new: true }
  )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}
async function deleteFromCart(userId, productId) {
  return await User.findByIdAndUpdate(
    userId,
    {
      $pull: { cart: { productId: productId } },
    },
    { new: true }
  )
    .then((user) => {
      return user;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}
async function isExistItemInCart(userId, productId) {
  return await User.findById(userId)
    .then((user) => {
      const itemIsExists = user.cart.some(
        (item) => item.productId === productId
      );
      return itemIsExists;
    })
    .catch((err) => {
      console.log(err);
      return undefined;
    });
}

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  isExistUser,
  getUserById,
  editProfile,
  addToCart,
  deleteFromCart,
  isExistItemInCart,
};
