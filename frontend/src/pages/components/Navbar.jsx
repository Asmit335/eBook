import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-900/95 backdrop-blur-sm fixed w-full top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            alt="Logo"
            className="h-8"
          />
          <span className="text-white text-2xl font-bold tracking-wide">
            EBook
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-white text-lg hover:text-blue-300 transition duration-200"
          >
            Home
          </Link>

          <Link
            to="/books"
            className="text-white text-lg hover:text-blue-300 transition duration-200"
          >
            Books
          </Link>

          <Link
            to="/addbook"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-200"
          >
            Add Book
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-800/95 backdrop-blur-sm px-6 py-4 space-y-4 text-center shadow-lg">
          <Link
            to="/"
            className="block text-white text-lg hover:text-blue-300 transition"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/books"
            className="block text-white text-lg hover:text-blue-300 transition"
            onClick={() => setMenuOpen(false)}
          >
            Books
          </Link>

          <Link
            to="/addbook"
            className="block bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
            onClick={() => setMenuOpen(false)}
          >
            Add Book
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
