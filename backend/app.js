const express = require("express");
const cookieParser = require("cookie-parser");

const erorrMiddleware = require("./middlewares/error");

const app = express();

app.use(express.json());
app.use(cookieParser());

// Import routes
const product = require("./routes/productRoute");

const user = require("./routes/userRoute");

app.use("", product);
app.use("", user);

app.use(erorrMiddleware);
module.exports = app;
