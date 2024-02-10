const { Router } = require("express");
const multer = require("multer");
const {
  handleUserSignup,
  handleUserSignin,
  handleUserUpdate,
  handleUserDelete,
  handleGetUser,
} = require("../controllers/user.js");
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

// Route for handling user signup
router.post("/signup", upload, handleUserSignup);
router.post("/signin", handleUserSignin);

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

//REST api for user profile
router.get("/:id", handleGetUser);
router.get("/profile", (req, res) => {
  return res.render("profile", {
    user: req.user,
  });
});

router.delete("/profile/delete/:id", handleUserDelete);

router.put("/profile/update/:id", handleUserUpdate);
module.exports = router;
