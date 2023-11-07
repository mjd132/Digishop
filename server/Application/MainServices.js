const { MainPage } = require("../Infrastructure/Database");

async function get() {
  return await MainPage.findOne()
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
}
async function set(main) {
  const count = await MainPage.count();
  if (count === 1) {
    return await MainPage.findOneAndUpdate({}, main)
      .then(() => {
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  } else if (count === 0) {
    return await MainPage.create(main)
      .then(() => {
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }
}
module.exports = { get, set };
