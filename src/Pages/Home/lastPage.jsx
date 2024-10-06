import React, { useEffect, useState } from "react";
import { Statistic, Card, Row, Col, Typography, message, Button } from "antd";
import axios from "axios";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import {
  BookOutlined,
  UserOutlined,
  TeamOutlined,
  ReadOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const LastPage = () => {
  const [stats, setStats] = useState({});
  const [quote, setQuote] = useState("");
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    fetchStatistics();
    fetchQuoteOfTheDay();
    fetchBlogs();
  }, []);

  const fetchStatistics = async () => {
    try {
      const { data } = await axios.get(
        "https://giyan-udoye.vercel.app/api/v1/stats"
      );
      setStats(data);
    } catch (error) {
      message.error("Failed to fetch statistics");
    }
  };

  const fetchQuoteOfTheDay = async () => {
    try {
      const { data } = await axios.get(
        "https://giyan-udoye.vercel.app/api/v1/quotes"
      );
      console.log(data);

      if (data.length > 0) {
        const latestQuote = data.reduce((latest, current) =>
          new Date(current.createdAt) > new Date(latest.createdAt)
            ? latest
            : current
        );
        setQuote(latestQuote.text);
      } else {
        setQuote("No quotes available");
      }
    } catch (error) {
      message.error("Failed to fetch quote of the day");
    }
  };

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get(
        "https://giyan-udoye.vercel.app/api/v1/blogs?limit=3"
      );
      setBlogs(data);
    } catch (error) {
      message.error("Failed to fetch blogs");
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gradient-to-b from-blue-50 to-purple-50">
      {/* Library Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <Title className="text-center mb-8 text-4xl font-bold text-indigo-700">
          Library Statistics
        </Title>
        <Row gutter={[24, 24]} justify="center">
          <Col xs={24} sm={12} md={6}>
            <Card className="shadow-lg rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 text-white hover:shadow-xl transition-all duration-300">
              <Statistic
                title={<span className="text-white">Total Books</span>}
                value={stats.totalBooks}
                prefix={<BookOutlined className="text-2xl" />}
                valueStyle={{ color: "white", fontSize: "2rem" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="shadow-lg rounded-lg bg-gradient-to-br from-green-400 to-green-600 text-white hover:shadow-xl transition-all duration-300">
              <Statistic
                title={<span className="text-white">Registered Users</span>}
                value={stats.totalUsers}
                prefix={<UserOutlined className="text-2xl" />}
                valueStyle={{ color: "white", fontSize: "2rem" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="shadow-lg rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600 text-white hover:shadow-xl transition-all duration-300">
              <Statistic
                title={<span className="text-white">Active Members</span>}
                value={stats.activeMembers}
                prefix={<TeamOutlined className="text-2xl" />}
                valueStyle={{ color: "white", fontSize: "2rem" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="shadow-lg rounded-lg bg-gradient-to-br from-red-400 to-red-600 text-white hover:shadow-xl transition-all duration-300">
              <Statistic
                title={<span className="text-white">Ongoing Classes</span>}
                value={stats.ongoingClasses}
                prefix={<ReadOutlined className="text-2xl" />}
                valueStyle={{ color: "white", fontSize: "2rem" }}
              />
            </Card>
          </Col>
        </Row>
      </motion.div>

      {/* Quote of the Day */}
      <motion.div
        className="mb-16 bg-gradient-to-r from-purple-400 to-pink-500 p-8 rounded-lg shadow-lg text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title level={2} className="text-center mb-6 text-white">
          Quote of the Day
        </Title>
        <Paragraph className="text-2xl italic text-center font-serif">
          &ldquo;{quote}&rdquo;
        </Paragraph>
      </motion.div>

      {/* Latest Blogs */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <Title className="text-center mb-8 text-4xl font-bold text-indigo-700">
          Latest Blogs
        </Title>
        <Row gutter={[24, 24]} justify="center">
          {blogs.slice(0, 3).map((blog) => (
            <Col xs={24} sm={24} md={8} key={blog._id}>
              <Card
                hoverable
                className="shadow-lg rounded-lg bg-white hover:shadow-xl transition-all duration-300"
              >
                <Card.Meta
                  title={blog.title}
                  description={
                    <>
                      <Paragraph ellipsis={{ rows: 3 }}>
                        {blog.content}
                      </Paragraph>
                      {blog.publishedDate && (
                        <Paragraph
                          type="secondary"
                          className="text-right text-sm mt-2"
                        >
                          Published on:{" "}
                          {format(
                            new Date(blog.publishedDate),
                            "MMMM dd, yyyy"
                          )}
                        </Paragraph>
                      )}
                    </>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
        <div className="flex justify-center mt-8">
          <Link to="/blogs">
            <Button
              type="primary"
              size="large"
              className="bg-indigo-600 hover:bg-indigo-700 border-none"
            >
              See All Blogs
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default LastPage;
