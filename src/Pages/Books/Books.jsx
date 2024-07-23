import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../../Components/BookCard'; // Adjust import path if needed

const Books = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('/api/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Failed to fetch books:', error);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className=" mx-auto">
        <input
          type="text"
          placeholder="Search books"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="mb-6 py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.length > 0 ? (
            filteredBooks.map(book => (
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
      </div>
    </div>
  );
};

export default Books;
