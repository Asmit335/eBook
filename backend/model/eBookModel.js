const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const eBookSchema = new Schema(
  {
    bookName: {
      type: String,
      unique: true,
    },
    bookPrice: {
      type: number,
    },
    isbnNumber: {
      type: Number,
    },
    authorName: {
      type: String,
    },
    publishedAt: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Ebook = mongoose.model("Book", eBookSchema);
module.exports = Ebook;
