import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    bookName: "",
    bookPrice: "",
    isbNumber: "",
    authorName: "",
    publishedAt: "",
    publication: "",
    description: "",
    image: null,
  });

  const [preview, setPreview] = useState(null); // preview uploaded image
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
      setPreview(URL.createObjectURL(files[0])); 
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.bookName || !formData.bookPrice || !formData.image) {
      setMessage("Book Name, Price, and Image are required!");
      return;
    }

    setLoading(true);
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    try {
      const response = await axios.post("https://ebook-kr5u.onrender.com/addbook", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response);
      setMessage("Book added successfully!");
      setFormData({
        bookName: "",
        bookPrice: "",
        isbNumber: "",
        authorName: "",
        publishedAt: "",
        publication: "",
        description: "",
        image: null,
      });
      setPreview(null);
      navigate("/")
    } catch (err) {
      setMessage("Something went wrong. Try again.");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <main className="pt-28 px-4">
        <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-8">
            Add New Book
          </h1>

          {message && (
            <div className="text-center mb-4 text-sm font-medium text-red-600">
              {message}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
           
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Book Name
              </label>
              <input
                type="text"
                name="bookName"
                value={formData.bookName}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
                placeholder="Enter book name"
                required
              />
            </div>

            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Book Price
                </label>
                <input
                  type="number"
                  name="bookPrice"
                  value={formData.bookPrice}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
                  placeholder="Enter price"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  ISBN Number
                </label>
                <input
                  type="text"
                  name="isbNumber"
                  value={formData.isbNumber}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
                  placeholder="Enter ISBN"
                />
              </div>
            </div>

            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Author Name
                </label>
                <input
                  type="text"
                  name="authorName"
                  value={formData.authorName}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
                  placeholder="Enter author name"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Publication
                </label>
                <input
                  type="text"
                  name="publication"
                  value={formData.publication}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
                  placeholder="Enter publication"
                />
              </div>
            </div>

            
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Published At
              </label>
              <input
                type="date"
                name="publishedAt"
                value={formData.publishedAt}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
              />
            </div>

           
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Upload Book Image
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-4 w-48 h-48 object-contain rounded-lg border"
                />
              )}
            </div>

           
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 h-32 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
                placeholder="Write book description..."
              ></textarea>
            </div>

           
            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300 disabled:opacity-50"
              >
                {loading ? "Adding..." : "Add Book"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default AddBook;
