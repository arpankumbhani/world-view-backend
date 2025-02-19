const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors({ origin: "*" }));
require("dotenv").config();

//middleware to parse json request body
app.use(express.json());

//mount the todo  API routes
app.use("/api/auth", require("./Routes/User"));
app.use("/api/cities", require("./Routes/Cities"));

app.get("/", (req, res) => {
  res.send({
    status: "ok",
  });
});

app.get("/ping", (req, res) => {
  res.send({
    status: "pong 🏓",
  });
});

const port = process.env.PORT || 4000;

app.listen(port, (err, res) => {
  if (err) {
    console.log(err);
    return res.status(500).send(err.message);
  } else {
    console.log("Port Running on port: " + port);
  }
});

//connect to database
const dbConnect = require("./config/database");
dbConnect();
