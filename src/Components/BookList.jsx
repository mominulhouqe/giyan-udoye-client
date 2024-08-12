import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { List, Card, message } from "antd";
import FeatureBookButton from "./FeatureBookButton"; // Adjust the import path
import BookCard from "./BookCard";
import { fetchBooks } from "../redux/slices/booksSlice";

const BookList = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  // Callback function to refresh the book list
  const handleBookUpdate = () => {
    dispatch(fetchBooks());
  };
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <div className="p-6  ">
      <h2 className="text-4xl text-center font-bold mb-8 underline text-white">Book List</h2>
      <input
        type="text"
        placeholder="Search books"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
      />
      <List
        loading={loading}
        grid={{ gutter: 12, column: 3 }}
        dataSource={filteredBooks}
        renderItem={(book) => (
          <List.Item>
            <Card
              title={book.title}
              extra={
                <FeatureBookButton
                  bookId={book._id}
                  featured={book.featured}
                  onSuccess={handleBookUpdate}
                />
              }
            >
              <BookCard
                key={book._id}
                title={book.title}
                author={book.author}
                description={book.description}
                image={book.image}
                id={book._id}
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default BookList;
