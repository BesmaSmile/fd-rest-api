const multer = require('multer');
const { format } = require('date-fns');
const path = require('path');

const imageStorage = (destination) => multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${format(new Date(Date.now()), 'yyyy-MM-dd-HH-mm-ss-SS')}${path.extname(file.originalname)}`);
  },
});

const uploadImage = (destination) => multer({
  storage: imageStorage(destination),
});

module.exports = uploadImage;
