const { Router } = require("express");
const multer = require("multer");
const { handleMachineCreation } = require("../controllers/machines");

const path = require("path");

const router = Router();

// Set up Multer disk storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/profiles/`));
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

// Set up Multer upload instance
const upload = multer({ storage: storage }).single("profileImageURL");

router.post("/createMahine", upload, handleMachineCreation);

module.exports = router;
