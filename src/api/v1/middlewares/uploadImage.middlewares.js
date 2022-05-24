const multer = require("multer");
const sharp = require("sharp");
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

const uploadFiles = upload.array("images", 10);
const uploadImages = (req, res, next) => {
  uploadFiles(req, res, err => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res.send("Too many files to upload.");
      }
    } else if (err) {
      return res.send(err);
    }
    next();
  });
};
const resizeImages = async (req, res, next) => {
  if (!req.files) return next();
  req.body.images = [];
  const {name} = req.body
  await Promise.all(
    req.files.map(async (file,index) => {
      const newFilename = `${name}-${index}.jpeg`;
      await sharp(file.buffer)
        .resize(640, 320)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`/home/buidat/Desktop/EcommerceApi/src/api/v1/assets/images/${newFilename}`);
      req.body.images.push(newFilename);
    })
  );
  next();
};

module.exports = {
  uploadImages: uploadImages,
  resizeImages: resizeImages
};