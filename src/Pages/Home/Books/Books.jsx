import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../../../Components/BookCard";
import { Link, useNavigate } from "react-router-dom";
import { Button, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../../redux/slices/booksSlice";

const Books = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.books);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleSeeAllClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/bookList");
    }
  };
  if (loading) {
    return <Spin tip="Loading..."></Spin>;
  }
  return (
    <div className="p-6 bg-gray-50 bg-opacity-50 m-3 rounded-md">
      <input
        type="text"
        placeholder="Search books"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredBooks.length > 0 ? (
          filteredBooks
            .slice(0, 8)
            .map((book) => (
              <BookCard
                key={book._id}
                title={book.title}
                author={book.author}
                description={book.description}
                image={book.image}
                id={book._id}
              />
            ))
        ) : (
          <p className="text-center col-span-full">No books found</p>
        )}
      </div>
      <div className="flex justify-end my-3">
        <Button onClick={handleSeeAllClick}>See all</Button>
      </div>

      <hr />
    </div>
  );
};

export default Books;
