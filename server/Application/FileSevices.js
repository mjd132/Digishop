//Database Section
const { FileStorage } = require("../Infrastructure/Database");

async function storeFile(file) {
  return await FileStorage.create(file)
    .then((result) => {
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}
module.exports = {
  addFile: storeFile,
};
