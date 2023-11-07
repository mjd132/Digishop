const { Product } = require("../Infrastructure/Database");

async function get(productId) {
  return await Product.findOne({ link: productId })
    .then((product) => {
      return product;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
}
async function add(product) {
  return await Product.create(product)
    .then((res) => {
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
}
module.exports = { get, add };
