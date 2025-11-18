const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const allowedFileType = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedFileType.includes(file.mimetype)) {
      cb(new Error("This type of file isnot supported."));
      return;
    }
    cb(null, "./storage");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

module.exports = { storage, multer };
