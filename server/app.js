require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require('cors')
const database = require("./config/database.js")
const app = express();

const userRoutes = require("./routes/userRoute.js")

const PORT = process.env.PORT || 4000;

// Connection
database.connect();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
)

// Routes
app.use("/api/v1/auth", userRoutes)


app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your Server is up And Running...."
  })
})

//Server is runing
app.listen(PORT, () => console.log(`Server start at ${PORT}`));
