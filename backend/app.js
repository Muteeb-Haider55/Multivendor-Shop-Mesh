const express = require("express");
const ErrorHandler = require("./middlware/error.js");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// Add test route before creating server
// app.get("/api/test", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "API is working!",
//     timestamp: new Date().toISOString(),
//   });
// });

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}

// import routes
const user = require("./controllers/user.js");
const shop = require("./controllers/shop.js");
const product = require("./controllers/product.js");
const event = require("./controllers/event.js");
const coupon = require("./controllers/coupounCode.js");

app.use("/api/v2/user", user);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/event", event);
app.use("/api/v2/coupon", coupon);

//it's for error handling
app.use(ErrorHandler);
module.exports = app;
