/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import BookCard from "../../../Components/BookCard";
import { useNavigate } from "react-router-dom";
import { Button, Spin, Input, Typography, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../../redux/slices/booksSlice";
import { SearchOutlined, BookOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Books = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.books);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleSeeAllClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/bookList");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" tip="Loading books..." />
      </div>
    );
  }

  return (
    <div className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50 m-4 rounded-lg shadow-lg">
      <Space direction="vertical" size="large" className="w-full">
        <Title level={2} className="text-center text-indigo-700">
          <BookOutlined className="mr-2" />
          Explore Our Collection
        </Title>

        <Input
          size="large"
          placeholder="Search books"
          prefix={<SearchOutlined />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-6 shadow-sm hover:shadow-md transition-shadow duration-300"
        />

        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBooks.slice(0, 8).map((book) => (
              <BookCard
                key={book._id}
                title={book.title}
                author={book.author}
                description={book.description}
                image={book.image}
                id={book._id}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Title level={4} className="text-gray-500">
              No books found
            </Title>
          </div>
        )}

        <div className="flex justify-end mt-6">
          <Button
            type="primary"
            size="large"
            onClick={handleSeeAllClick}
            className="bg-indigo-600 hover:bg-indigo-700 border-none shadow-md hover:shadow-lg transition-all duration-300"
          >
            See All Books
          </Button>
        </div>
      </Space>
    </div>
  );
};

export default Books;
