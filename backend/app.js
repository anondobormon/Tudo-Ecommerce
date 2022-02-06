const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const app = express();

const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

//Error middleware
app.use(errorMiddleware);

module.exports = app;
