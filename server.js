const express = require("express");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const categoryRoute = require("./routes/catgeory-route");
const unitOfMeasureRoute = require("./routes/unitOfmeasure-route");
const productRoute = require("./routes/product-route");
const userRoute = require("./routes/user-route");
const cartRoute = require("./routes/cart-route");




let dotenv = require("dotenv").config();

const app = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  next();
});

app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));



app.use("/category", categoryRoute);
app.use("/unit", unitOfMeasureRoute);
app.use("/product", productRoute);
app.use("/user", userRoute);
app.use("/cart", cartRoute);


app.get("/", async (req, res) => {

  return res.status(404).json({ message: "Error page not Found 404" });
});
mongoose
  .connect(process.env.MONGOPATH)
  .then(() => {
    console.log("Connect to Database...");
    app.listen(5500);
    console.log("listening in port 5500");
  })
  .catch((err) => {
    console.log(err.message);
  });
