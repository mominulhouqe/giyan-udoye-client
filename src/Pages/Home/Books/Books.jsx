import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../../../Components/BookCard"; // Adjust import path if needed
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          message.error("No authentication token found");
          return;
        }
        const response = await axios.get("api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        message.error("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("/api/books");
        setBooks(response.data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 ">
      <input
        type="text"
        placeholder="Search books"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredBooks.length > 0 ? (
          filteredBooks.slice(0, 8).map((book) => (
            <BookCard
              key={book._id}
              title={book.title}
              author={book.author}
              description={book.description}
              image={book.image} // Ensure that your book data includes the image URL
            />
          ))
        ) : (
          <p className="text-center col-span-full">No books found</p>
        )}
      </div>
      <Link to="bookList" className="flex justify-end my-3">
        <Button>See all</Button>
      </Link>

      <hr />
    </div>
  );
};

export default Books;
