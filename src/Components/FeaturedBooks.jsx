// src/components/FeaturedBooks.js
import { useEffect, useState } from 'react';
import { Carousel, Card, Spin, message } from 'antd';
import axios from 'axios';

const FeaturedBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('/api/books'); // Fetch all books
  
        // Filter out only the featured books
        const featuredBooks = response.data.filter(book => book.featured); // Adjust property based on your data
        setBooks(featuredBooks);
      } catch (error) {
        console.error('Error fetching books:', error); // Log error for debugging
        message.error('Failed to fetch books');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <Spin tip="Loading featured books..." />;
  }

  return (
    <div className="py-12 bg-gray-100">
      <h2 className="text-3xl text-center font-bold mb-8">Featured Books</h2>
      <Carousel autoplay>
        {books.length > 0 ? (
          books.map(book => (
            <Card key={book._id} title={book.title} className="mx-4">
              <p>{book.author}</p>
              <p>{book.description}</p>
            </Card>
          ))
        ) : (
          <p className="text-center">No featured books available</p>
        )}
      </Carousel>
    </div>
  );
};

export default FeaturedBooks;
