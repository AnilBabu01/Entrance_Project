const multer = require("multer");
//this is use for upload image another plateform
// const storage = multer.memoryStorage();

var storage = multer.diskStorage({
  destination: function (req, file, cd) {
    cd(null, "./public/upload");
  },
  filename: function (req, file, cd) {
    cd(null, Date.now() + " " + file.originalname);
  },
});

const upload = multer({ storage });

module.exports = upload;
