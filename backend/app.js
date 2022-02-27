const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const erorrMiddleware = require("./middlewares/error");

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload());

// Import routes
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");

app.use("", product);
app.use("", user);
app.use("", order);

app.use(erorrMiddleware);

module.exports = app;
