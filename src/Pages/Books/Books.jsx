// src/pages/Books.js
import  { useEffect, useState } from 'react';
import { List, Card, Input } from 'antd';
import axios from 'axios';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('/api/books').then(res => setBooks(res.data));
  }, []);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <Input
        placeholder="Search books"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="mb-4"
      />
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={filteredBooks}
        renderItem={book => (
          <List.Item>
            <Card title={book.title}>
              <p>{book.author}</p>
              <p>{book.description}</p>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Books;
