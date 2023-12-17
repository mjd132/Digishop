//Hard Store Section
const multer = require("multer");
const { addFile } = require("./FileSevices");

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const dynamicPath = "uploads/" + req.query.type;

    cb(null, dynamicPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now().toString() + "-" + file.originalname);
  },
});

const handleFileUpload = (inputName) => {
  const upload = multer({ storage: storage });
  const array = async (req, res, next) => {
    upload.array(inputName)(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // File has been successfully uploaded, now add it to the database
      try {
        const files = req.files; // The uploaded file details
        await addFile(files)
          .then((result) => {
            next();
          })
          .catch((err) => {
            res.status(500).json({ error: err.message });
          });
      } catch (error) {
        console.error("Error adding file to the database:", error);
        res
          .status(500)
          .json({ error: "Internal server error.\n" + err.message });
      }
    });
  };
  return { array };
};
module.exports = { handleFileUpload };
