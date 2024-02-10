require("dotenv").config();

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const animalRouter = require("./routes/animalRoute.js");
// const cerealRouter = require("./routes/cerealRoute.js");
// const fertiliserRouter = require("./routes/fertiliserRoute.js");
// const fruitRouter = require("./routes/fruitRoute.js");
// const mechanicalEquipmentRouter = require("./routes/mechanicalEquipmentRoute.js");
// const milkRouter = require("./routes/milkRoute.js");
const machineRouter = require("./routes/machinesRoute.js");
// const milkProductRouter = require("./routes/milkProductRoute.js");
// const pesticidesRouter = require("./routes/pesticidesRoute.js");
// const seedRouter = require("./routes/seedRoute.js");
const userRouter = require("./routes/userRoute.js");
// const vegetableRoter = require("./routes/vegetableRoute.js");

const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");

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
app.use("/api/machine", machineRouter);
app.use("/api/animal", animalRouter);
// app.use("/api/cereal", cerealRouter);
// app.use("/api/fertilider", fertiliserRouter);
// app.use("/api/fruit", fruitRouter);
// app.use("/api/mechanicalEquipment", mechanicalEquipmentRouter);
// app.use("/api/milk", milkRouter);
// app.use("/api/milkProduct", milkProductRouter);
// app.use("/api/pesticides", pesticidesRouter);
// app.use("/api/seed", seedRouter);
// app.use("/api/vegetable", vegetableRoter);

app.get("/", async (req, res) => {
  res.render("home", {
    user: req.user,
  });
});

//Server is runing
app.listen(PORT, () => console.log(`Server start on ${PORT}`));
