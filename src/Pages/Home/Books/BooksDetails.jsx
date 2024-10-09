import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Rate, Spin, message, Tag } from "antd";
import { ClockCircleOutlined, BookOutlined } from "@ant-design/icons";
import ReviewForm from "./ReviewForm";
import { motion } from "framer-motion";

const BooksDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
          `https://giyan-udoye.vercel.app/api/v1/books/${id}`
        );

        setBook(response.data);
      } catch (error) {
        console.error("Failed to fetch book details", error);
        message.error("Failed to fetch book details");
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" tip="Loading book details..." />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="text-center mt-20 text-2xl text-gray-600 animate-pulse">
        Book not found
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-6 lg:p-12 bg-gradient-to-br from-purple-50 to-indigo-50 shadow-lg rounded-xl"
    >
      {/* Book Cover and Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <motion.img
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          src={book.image}
          alt={book.title}
          className="w-full h-auto max-h-full object-cover rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
        />
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="md:col-span-2 text-center md:text-left bg-white p-8 rounded-2xl shadow-xl"
        >
          <h1 className="text-5xl font-bold text-indigo-800 mb-4">
            {book.title}
          </h1>
          <p className="text-2xl text-gray-600 mb-6">by {book.author}</p>
          <p className="text-gray-700 mb-6 leading-relaxed text-lg">
            {book.description}
          </p>
          <div className="flex items-center justify-center md:justify-start space-x-4 mb-6">
            <Rate
              disabled
              defaultValue={book.averageRating}
              className="text-yellow-400"
            />
            <span className="text-gray-700 text-lg ml-2">
              ({book.averageRating ? book.averageRating.toFixed(1) : "N/A"} / 5)
            </span>
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            {book.genre && (
              <Tag
                icon={<BookOutlined />}
                color="blue"
                className="text-base font-medium px-4 py-2 rounded-full"
              >
                {book.genre}
              </Tag>
            )}
            <Tag
              icon={<ClockCircleOutlined />}
              color="red"
              className="text-base font-medium px-4 py-2 rounded-full"
            >
              {book.publishedYear}
            </Tag>
          </div>
        </motion.div>
      </div>

      {/* Reviews Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-16"
      >
        <h2 className="text-4xl font-semibold text-indigo-800 mb-8">
          User Reviews
        </h2>
        <div className="bg-white p-8 rounded-2xl shadow-xl space-y-4">
          <p className="text-gray-600 text-lg italic">
            No reviews yet. Be the first to share your thoughts on this book!
          </p>
        </div>
      </motion.div>

      {/* Review Form Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-16"
      >
        <h2 className="text-4xl font-semibold text-indigo-800 mb-8">
          Write a Review
        </h2>
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <ReviewForm />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BooksDetails;
