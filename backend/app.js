const express = require("express");
const mongoose = require("mongoose");
const connectToDB = require("./database/mongdb");
const Ebook = require("./model/eBookModel");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//databaseConnection
connectToDB();

app.get("/", (req, res) => {
  res.status(200).json("Express is connected Successfully.");
});

app.post("/book", async (req, res) => {
  const { bookName, bookPrice, isbNumber, authorName, publishedAt } = req.body;
  const bookData = await Ebook.create({
    bookPrice,
    bookName,
    isbNumber,
    authorName,
    publishedAt,
  });
  res.status(200).json({
    message: "Book created Successfully.",
    data: bookData,
  });
});

app.listen(3000, (req, res) => {
  console.log("Server is running in Port No. 3000");
});
