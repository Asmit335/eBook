const express = require("express");
const mongoose = require("mongoose");
const connectToDB = require("./database/mongdb");

const app = express();

//databaseConnection
connectToDB();

app.get("/", (req, res) => {
  res.status(200).json("Express is connected Successfully.");
});

app.listen(3000, (req, res) => {
  console.log("Server is running in Port No. 3000");
});
