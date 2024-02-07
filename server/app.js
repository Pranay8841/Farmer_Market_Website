require("dotenv").config();

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const userRouter = require("./routes/user.js");

const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication.js");

const app = express();

const PORT = process.env.PORT || 8000;

// Connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDb connected"))
  .catch((err) => console.log("MongoDb error", err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views")); // Corrected 'view' to 'views'

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

// Routes
app.use("/api/user", userRouter);

app.get("/", async (req, res) => {
  res.render("home", {
    user: req.user,
  });
});

app.listen(PORT, () => console.log(`Server start on ${PORT}`));
