import { useState, useEffect } from 'react';
import { Table, Button, message } from 'antd';
import axios from 'axios';
import BookForm from './BookForm';

const Admin = () => {
  const [books, setBooks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get('/api/books');
        console.log('Fetched books:', res.data); // Log the response
        if (Array.isArray(res.data)) {
          setBooks(res.data);
        } else {
          throw new Error('Expected an array of books');
        }
      } catch (err) {
        message.error('Failed to fetch books');
        console.error(err); // Log the error
      }
    };
  
    fetchBooks();
  }, []);
  
  const showModal = (book = {}) => {
    setCurrentBook(book);
    setIsModalVisible(true);
  };

  const handleOk = async (updatedBook) => {
    try {
      if (updatedBook._id) {
        await axios.put(`/api/books/${updatedBook._id}`, updatedBook);
        message.success('Book updated successfully');
      } else {
        await axios.post('/api/books', updatedBook);
        message.success('Book added successfully');
      }
      setIsModalVisible(false);
      setCurrentBook(null);
      const res = await axios.get('/api/books');
      setBooks(res.data);
    } catch (err) {
      message.error('Failed to save book');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentBook(null);
  };

  return (
    <div className="p-6">
      <Button type="primary" onClick={() => showModal()}>
        Add Book
      </Button>
      <Table dataSource={books} rowKey="_id" className="mt-4">
        <Table.Column title="Title" dataIndex="title" key="title" />
        <Table.Column title="Author" dataIndex="author" key="author" />
        <Table.Column
          title="Image"
          dataIndex="image"
          key="image"
          render={(text, record) => (
            <img src={record.image} alt={record.title} style={{ width: '50px', height: '50px' }} />
          )}
        />
        <Table.Column
          title="Actions"
          key="actions"
          render={(text, record) => (
            <Button onClick={() => showModal(record)}>Edit</Button>
          )}
        />
      </Table>
      <BookForm
        book={currentBook}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default Admin;
