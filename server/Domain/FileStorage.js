const FileStorage = {
  fieldname: String,
  originalname: String,
  encoding: String,
  mimetype: String,
  destination: String,
  filename: { type: String, index: true },
  path: String,
  size: Number,
};
module.exports = FileStorage;
