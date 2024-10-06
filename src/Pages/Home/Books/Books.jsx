/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import BookCard from "../../../Components/BookCard";
import { useNavigate } from "react-router-dom";
import { Button, Spin, Input, Typography, Space, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../../redux/slices/booksSlice";
import { SearchOutlined, BookOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

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
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" tip="Loading books..." />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4 bg-gradient-to-r from-blue-100 to-indigo-100 mt-6 md:m-2  rounded-lg"
    >
      <Space direction="vertical" size="large" className="w-full">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Title
            level={2}
            className="text-center text-indigo-800 font-extrabold"
          >
            <BookOutlined className="mr-2 text-yellow-500" />
            Discover Our Literary Treasures
          </Title>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Input
            size="large"
            placeholder="Search for your next adventure..."
            prefix={<SearchOutlined className="text-indigo-500" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-6 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-full"
          />
        </motion.div>

        {filteredBooks.length > 0 ? (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {filteredBooks.slice(0, 8).map((book, index) => (
              <motion.div
                key={book._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <BookCard
                  title={book.title}
                  author={book.author}
                  description={book.description}
                  image={book.image}
                  id={book._id}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center py-12"
          >
            <Title level={4} className="text-gray-600">
              No books found. Try a different search!
            </Title>
          </motion.div>
        )}

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-end mt-8"
        >
          <Button
            type="primary"
            size="large"
            onClick={handleSeeAllClick}
            className="bg-indigo-600 hover:bg-indigo-700 border-none shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-8"
          >
            Explore All Books
          </Button>
        </motion.div>
      </Space>
    </motion.div>
  );
};

export default Books;
