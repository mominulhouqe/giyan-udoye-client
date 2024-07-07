import { useState, useEffect } from 'react';
import axios from 'axios';
import { List, Card,  } from 'antd';
import FeatureBookButton from './FeatureBookButton'; // Adjust the import path

const BookList = () => {
  const [books, setBooks] = useState([]);

  // Fetch the list of books
  const fetchBooks = async () => {
    try {
      const response = await axios.get('/api/books');
      console.log(response);
      setBooks(response.data);
    } catch (error) {
      console.error("Failed to fetch books", error);
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
        grid={{ gutter: 16, column: 3 }}
        dataSource={books}
        renderItem={book => (
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
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Description:</strong> {book.description}</p>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default BookList;
