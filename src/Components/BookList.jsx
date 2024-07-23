import { useState, useEffect } from "react";
import axios from "axios";
import { List, Card, message } from "antd";
import FeatureBookButton from "./FeatureBookButton"; // Adjust the import path
import BookCard from "./BookCard";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the list of books
  const fetchBooks = async () => {
    try {
      const response = await axios.get("/api/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Failed to fetch books", error);
      message.error("Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Callback function to refresh the book list
  const handleBookUpdate = () => {
    fetchBooks();
  };

  return (
    <div className="py-12 bg-gray-100">
      <h2 className="text-3xl text-center font-bold mb-8">Book List</h2>
      <List
        loading={loading}
        grid={{ gutter: 12, column: 3 }}
        dataSource={books}
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
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default BookList;
