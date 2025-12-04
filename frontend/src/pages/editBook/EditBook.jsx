import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Fetch existing book data
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`https://ebook-kr5u.onrender.com/${id}`);
        const data = res.data.data;

        setFormData({
          bookName: data.bookName,
          bookPrice: data.bookPrice,
          isbNumber: data.isbNumber || "",
          authorName: data.authorName || "",
          publishedAt: data.publishedAt || "",
          publication: data.publication || "",
          description: data.description || "",
          image: null,
        });

        setPreview(data.imageUrl); // show existing image
      } catch (error) {
        console.log(error);
      }
    };

    fetchBook();
  }, [id]);

  // Handle input
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Submit Updated Data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    for (const key in formData) data.append(key, formData[key]);

    try {
      await axios.patch(`https://ebook-kr5u.onrender.com/book/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Book Updated Successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />

      <main className="pt-28 px-4">
        <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-8">
            Edit Book
          </h1>

          {message && (
            <p className="text-center text-red-600 mb-4">{message}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Book Name */}
            <div>
              <label className="font-semibold">Book Name</label>
              <input
                type="text"
                name="bookName"
                value={formData.bookName}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 mt-1"
                required
              />
            </div>

            {/* Price + ISBN */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="font-semibold">Book Price</label>
                <input
                  type="number"
                  name="bookPrice"
                  value={formData.bookPrice}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 mt-1"
                />
              </div>

              <div>
                <label className="font-semibold">ISBN Number</label>
                <input
                  type="text"
                  name="isbNumber"
                  value={formData.isbNumber}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 mt-1"
                />
              </div>
            </div>

            {/* Author + Publication */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="font-semibold">Author Name</label>
                <input
                  type="text"
                  name="authorName"
                  value={formData.authorName}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 mt-1"
                />
              </div>

              <div>
                <label className="font-semibold">Publication</label>
                <input
                  type="text"
                  name="publication"
                  value={formData.publication}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 mt-1"
                />
              </div>
            </div>

            {/* Published Date */}
            <div>
              <label className="font-semibold">Published At</label>
              <input
                type="date"
                name="publishedAt"
                value={formData.publishedAt}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 mt-1"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="font-semibold">Upload Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 mt-1"
              />

              {preview && (
                <img
                  src={preview}
                  className="mt-4 w-48 h-48 object-contain rounded-lg border"
                  alt="preview"
                />
              )}
            </div>

            {/* Description */}
            <div>
              <label className="font-semibold">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 h-32 mt-1"
              ></textarea>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl mt-4"
            >
              {loading ? "Updating..." : "Update Book"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default EditBook;
