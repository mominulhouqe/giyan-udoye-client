import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { List, Card, message } from "antd";
import FeatureBookButton from "./FeatureBookButton";
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

  const handleBookUpdate = () => {
    dispatch(fetchBooks());
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-4xl text-center font-bold mb-8 underline text-white">
        Book List
      </h2>
      <input
        type="text"
        placeholder="Search books"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
      />
      <List
        loading={loading}
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 4,
          xxl: 6,
        }}
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
              className="shadow-md hover:shadow-lg transition-shadow duration-300"
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
