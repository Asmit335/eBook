import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const SingleBook = () => {
  const { id } = useParams();
  const navigate=useNavigate()
  const [book, setBook] = useState(null);

  const fetchItem = async () => {
    const response = await axios.get(`http://localhost:3000/book/${id}`);
    if (response.status === 200) {
      setBook(response.data.data);
    }
  };

  useEffect(() => {
    fetchItem();
  }, [id]);

  if (!book)
    return (
      <div className="text-center text-xl font-semibold mt-20">
        Loading...
      </div>
    );

    const handleDelete=async()=>{
      const sure=window.confirm("Are you sure want to delete this book?")
      if(!sure) return;
      const response=await axios.delete(`http://localhost:3000/book/${id}`)
      if(response.status===200){
        alert("Book Deleted Successfully.");
      }
      navigate("/")
    }

  return (
    <>
      <Navbar/>
    <div className="max-w-5xl mx-auto mt-24 p-6">
      <div className="bg-white rounded-xl shadow-xl p-8 md:flex gap-10 items-start">

        {/* Book Image */}
        <div className="flex justify-center md:w-1/2">
          <img
            className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 bg-gray-50 p-4"
            src={book.imageUrl || "https://pngimg.com/d/book_PNG51090.png"}
            alt={book.bookName}
            width={300}
          />
        </div>

        {/* Book Details */}
        <div className="md:w-1/2">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            {book.bookName}
          </h1>

          <p className="text-2xl mt-4 font-semibold text-blue-700">
            Rs. {book.bookPrice}
          </p>

          {/* Author & Publishing */}
          <div className="mt-4 space-y-2 text-gray-700">
            <p>
              <span className="font-semibold">Author:</span>{" "}
              {book.authorName || "Unknown"}
            </p>
            <p>
              <span className="font-semibold">Publication:</span>{" "}
              {book.publication || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Published At:</span>{" "}
              {book.publishedAt || "N/A"}
            </p>
          </div>

          {/* Tags */}
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
              #{book.authorName || "author"}
            </span>
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
              #{book.publication || "publication"}
            </span>
            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
              Book
            </span>
          </div>

          {/* Description */}
          <p className="mt-6 text-gray-600 leading-relaxed">
            {book.description ||
              "This is a wonderful book that offers knowledge, insights, and an amazing reading experience. Dive into the world of learning with this beautifully written piece."}
          </p>
          
      <div className="mt-8 flex gap-4">
      <Link to={`/editbook/${book._id}`}
        className="px-5 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white     font-semibold shadow-md transition cursor-pointer">
       Edit Book
      </Link>
        <button
        onClick={handleDelete}
        className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold shadow-md transition cursor-pointer">
        Delete Book
        </button>
        </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default SingleBook;
