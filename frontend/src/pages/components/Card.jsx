import React from "react";
import { Link } from "react-router-dom";

const Card = ({ booksItems }) => {
  return (
    <div className="max-w-sm bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 overflow-hidden mt-8">
      
      {/* Book Image */}
      <div className="w-full h-56 bg-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src={booksItems.imageUrl || "https://pngimg.com/d/book_PNG51090.png"}
          alt={booksItems.bookName}
          className="h-full object-contain p-4 transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Book Details */}
      <div className="px-6 py-5">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          {booksItems.bookName}
        </h2>

        <p className="text-lg font-semibold text-blue-700 mb-3">
          Rs. {booksItems.bookPrice}
        </p>

        <p className="text-gray-600 text-sm leading-relaxed">
          {booksItems.description ||
            "A wonderful book that provides knowledge, insight, and an engaging reading experience."}
        </p>
      </div>

      {/* Tags + Button */}
      <div className="px-6 pb-5 flex flex-wrap items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 text-xs rounded-full">
            #{booksItems.authorName || "author"}
          </span>
          <span className="bg-purple-100 text-purple-700 px-3 py-1 text-xs rounded-full">
            #{booksItems.publication || "books"}
          </span>
        </div>

        <Link
          to={`/book/${booksItems._id}`}
          className="mt-4 w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-all duration-200"
        >
          See More
        </Link>
      </div>
    </div>
  );
};

export default Card;
