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
  const {
    bookName,
    bookPrice,
    isbNumber,
    authorName,
    publishedAt,
    publication,
  } = req.body;
  const bookData = await Ebook.create({
    bookPrice,
    bookName,
    isbNumber,
    authorName,
    publishedAt,
    publication,
  });
  res.status(201).json({
    message: "Book created Successfully.",
    data: bookData,
  });
});

app.get("/book", async (req, res) => {
  const bookData = await Ebook.find();
  res.status(200).json({
    message: "Book read Successfully.",
    data: bookData,
  });
});

app.get("/book/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const bookData = await Ebook.findById(id);
    if (!bookData) {
      res.status(404).json({
        message: "Book not available.",
      });
    } else {
      res.status(200).json({
        message: "Single Book read Successfully.",
        data: bookData,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went Wrong.",
    });
  }
});

app.listen(3000, (req, res) => {
  console.log("Server is running in Port No. 3000");
});
