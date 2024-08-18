import React, { useEffect, useState } from "react";
import { Statistic, Card, Row, Col, Typography, message, Button } from "antd";
import axios from "axios";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Link } from "react-router-dom";

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
      const { data } = await axios.get("https://giyan-udoye.vercel.app/api/v1/stats");
      setStats(data);
    } catch (error) {
      message.error("Failed to fetch statistics");
    }
  };

  const fetchQuoteOfTheDay = async () => {
    try {
      const { data } = await axios.get("https://giyan-udoye.vercel.app/api/v1/quotes");
      console.log(data);

      // Assuming each quote has a `createdAt` field to sort by
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
    <div className="container mx-auto p-6">
      {/* Library Statistics */}
      <div className="mb-12">
        <Title  className="text-center mb-6 text-4xl underline">
          Library Statistics
        </Title>
        <Row gutter={16} justify="center" className="gap-3">
          <Col xs={24} sm={11} md={5}>
            <Card className="shadow-lg rounded-lg bg-white">
              <Statistic title="Total Books" value={stats.totalBooks} />
            </Card>
          </Col>
          <Col xs={24} sm={11} md={5}>
            <Card className="shadow-lg rounded-lg bg-white">
              <Statistic title="Registered Users" value={stats.totalUsers} />
            </Card>
          </Col>
          <Col xs={24} sm={11} md={5}>
            <Card className="shadow-lg rounded-lg bg-white">
              <Statistic title="Active Members" value={stats.activeMembers} />
            </Card>
          </Col>
          <Col xs={24} sm={11} md={5}>
            <Card className="shadow-lg rounded-lg bg-white">
              <Statistic title="Ongoing Classes" value={stats.ongoingClasses} />
            </Card>
          </Col>
        </Row>
      </div>

      {/* Quote of the Day */}
      <motion.div
        className="mb-12 bg-blue-100 p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title level={2} className="text-center mb-4 underline">
          Quote of the Day
        </Title>
        <Paragraph className="text-lg italic text-center">"{quote}"</Paragraph>
      </motion.div>

      {/* Latest Blogs */}
      <div className="mb-12">
        <Title  className="text-center mb-6 text-4xl underline">
          Latest Blogs
        </Title>
        <Row gutter={16} justify="center" className="gap-2 ">
          {blogs.slice(0, 3).map((blog) => (
            <Col sm={16} md={7} key={blog._id}>
              <Card
                title={blog.title}
                bordered={false}
                className="shadow-lg rounded-lg bg-white"
                extra={
                  blog.publishedDate && (
                    <Paragraph type="secondary" className="text-right text-sm">
                      Published on:{" "}
                      {format(new Date(blog.publishedDate), "MMMM dd, yyyy")}
                    </Paragraph>
                  )
                }
              >
                <Paragraph>{blog.content}</Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
        <div className="flex justify-end mt-4">
          <Link to="/blogs" className="block">
            <Button type="default" className="cursor-pointer">
              See All
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LastPage;
