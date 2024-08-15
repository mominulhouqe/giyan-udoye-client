import React from "react";
import { useState, useEffect } from "react";
import { Table, Button, message, Popconfirm } from "antd";
import axios from "axios";
import BookForm from "./DashboardComponent/BookForm";
const AdminHome = () => {
  const [books, setBooks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const [addmember, setAddmember] = useState(null);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(
          "https://giyan-udoye.vercel.app/api/v1/books"
        ); // Ensure this URL is correct
        console.log("Fetched books:", res.data); // Log the response
        if (Array.isArray(res.data)) {
          setBooks(res.data);
        } else {
          throw new Error("Expected an array of books");
        }
      } catch (err) {
        message.error("Failed to fetch books");
        console.error(err); // Log the error
      }
    };

    fetchBooks();
  }, []);

  const showModal = (book = {}) => {
    setCurrentBook(book);
    setIsModalVisible(true);
  };
  const showModalAddMember = (member = {}) => {
    setAddmember(member);
    setIsModalVisible(true);
  };

  const handleOk = async (updatedBook) => {
    try {
      if (updatedBook._id) {
        await axios.put(
          `https://giyan-udoye.vercel.app/api/v1/books/${updatedBook._id}`,
          updatedBook
        ); // Ensure this URL is correct
        message.success("Book updated successfully");
      } else {
        await axios.post(
          "https://giyan-udoye.vercel.app/api/v1/books",
          updatedBook
        ); // Ensure this URL is correct
        message.success("Book added successfully");
      }
      setIsModalVisible(false);
      setCurrentBook(null);
      const res = await axios.get(
        "https://giyan-udoye.vercel.app/api/v1/books"
      ); // Ensure this URL is correct
      setBooks(res.data);
    } catch (err) {
      message.error("Failed to save book");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentBook(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://giyan-udoye.vercel.app/api/v1/books/${id}`);
      message.success("Book deleted successfully");
      setBooks(books.filter((book) => book._id !== id));
    } catch (err) {
      message.error("Failed to delete book");
    }
  };

  return (
    <div>
      <h2 className="py-4 mb-2 text-2xl font-bold underline text-center bg-gray-200">
        {" "}
        Books Page
      </h2>
      <Button type="primary" onClick={() => showModal()}>
        Add Book
      </Button>
      {/* <Button type="primary" onClick={() => showModalAddMember()}>
        Add Member
      </Button> */}

      <Table
        scroll={{ x: "100%", y: 500 }}
        dataSource={books}
        rowKey="_id"
        className="mt-4 overflow-x-auto"
      >
        <Table.Column title="Title" dataIndex="title" key="title" />
        <Table.Column title="Author" dataIndex="author" key="author" />
        <Table.Column
          title="Image"
          dataIndex="image"
          key="image"
          render={(text, record) => (
            <img
              src={record.image}
              alt={record.title}
              style={{ width: "50px", height: "50px" }}
            />
          )}
        />
        <Table.Column
          title="Actions"
          key="actions"
          render={(text, record) => (
            <div>
              <Button
                onClick={() => showModal(record)}
                style={{ marginRight: "8px" }}
              >
                Edit
              </Button>
              <Popconfirm
                title="Are you sure you want to delete this book?"
                onConfirm={() => handleDelete(record._id)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="danger">Delete</Button>
              </Popconfirm>
            </div>
          )}
        />
      </Table>
      <hr className="my-6" />
      {/* For add member
      <Table dataSource={addmember} rowKey="_id" className="mt-4">
        <Table.Column title="Name" dataIndex="name" key="name" />
        <Table.Column title="Email" dataIndex="email" key="email" />
        <Table.Column title="Phone" dataIndex="phone" key="phone" />
    
        <Table.Column
          title="Actions"
          key="actions"
          render={(text, record) => (
            <div>
              <Button
                onClick={() => showModalAddMember(record)}
                style={{ marginRight: "8px" }}
              >
                Edit
              </Button>
              <Popconfirm
                title="Are you sure you want to delete this book?"
                onConfirm={() => handleDelete(record._id)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="danger">Delete</Button>
              </Popconfirm>
            </div>
          )}
        />
      </Table> */}

      <BookForm
        book={currentBook}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default AdminHome;
