import React from "react";
import { useState, useEffect } from "react";
import {
  Table,
  Button,
  message,
  Popconfirm,
  Typography,
  Space,
  Card,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import BookForm from "./DashboardComponent/BookForm";

const { Title } = Typography;

const AdminHome = () => {
  const [books, setBooks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(
          "https://giyan-udoye.vercel.app/api/v1/books"
        );
        if (Array.isArray(res.data)) {
          setBooks(res.data);
        } else {
          throw new Error("Expected an array of books");
        }
      } catch (err) {
        message.error("Failed to fetch books");
        console.error(err);
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
        await axios.put(
          `https://giyan-udoye.vercel.app/api/v1/books/${updatedBook._id}`,
          updatedBook
        );
        message.success("Book updated successfully");
      } else {
        await axios.post(
          "https://giyan-udoye.vercel.app/api/v1/books",
          updatedBook
        );
        message.success("Book added successfully");
      }
      setIsModalVisible(false);
      setCurrentBook(null);
      const res = await axios.get(
        "https://giyan-udoye.vercel.app/api/v1/books"
      );
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
    <Card className="admin-home-card">
      <Title level={2} className="text-center mb-6">
        Book Management
      </Title>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => showModal()}
        className="mb-4"
      >
        Add New Book
      </Button>

      <Table
        dataSource={books}
        rowKey="_id"
        className="books-table"
        pagination={{ pageSize: 10 }}
        scroll={{ x: "max-content" }}
      >
        <Table.Column title="Title" dataIndex="title" key="title" />
        <Table.Column title="Author" dataIndex="author" key="author" />
        <Table.Column
          title="Cover"
          dataIndex="image"
          key="image"
          render={(text, record) => (
            <img
              src={record.image}
              alt={record.title}
              style={{ width: "50px", height: "70px", objectFit: "cover" }}
            />
          )}
        />
        <Table.Column
          title="Actions"
          key="actions"
          render={(text, record) => (
            <Space size="middle">
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => showModal(record)}
              >
                Edit
              </Button>
              <Popconfirm
                title="Are you sure you want to delete this book?"
                onConfirm={() => handleDelete(record._id)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="danger" icon={<DeleteOutlined />}>
                  Delete
                </Button>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>

      <BookForm
        book={currentBook}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </Card>
  );
};

export default AdminHome;
