const express = require("express");
const bodyParser = require("body-parser");
// const todoRouter = require("./routes/todo-route");
// const { default: mongoose } = require("mongoose");
// let dotenv = require("dotenv").config();

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

// app.use("/api", todoRouter);

app.use("/", async (req, res) => {
  return res.status(404).json({ message: "Error page not Found 404" });
});

app.listen(5000);

// mongoose
//   .connect(process.env.MONGOPATH)
//   .then(() => {
//     console.log("Connect to Database...");
//     app.listen(5500);
//     console.log("listening in port 5000");
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });
