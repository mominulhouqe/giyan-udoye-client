import React, { useEffect, useState } from "react";
import { Card, Row, Col, Typography, message } from "antd";
import { format } from "date-fns";
import axios from "axios";

const { Title, Paragraph } = Typography;

const BlogsAll = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("https://giyan-udoye.vercel.app/api/v1/blogs");
      setBlogs(data);
    } catch (error) {
      message.error("Failed to fetch blogs");
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <Title level={2} className="text-center mb-8">
        Latest Blogs
      </Title>

      {blogs.length > 0 ? (
        <Row gutter={[16, 16]} justify="center">
          {blogs.map((blog) => (
            <Col key={blog._id} xs={24} sm={12} md={8} lg={7}>
              <Card
                title={blog.title}
                bordered={false}
                className="shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow duration-300"
                extra={
                  blog.publishedDate && (
                    <Paragraph type="secondary" className="text-sm text-right">
                      Published on:{" "}
                      {format(new Date(blog.publishedDate), "MMMM dd, yyyy")}
                    </Paragraph>
                  )
                }
              >
                <Paragraph
                  ellipsis={{ rows: 3, expandable: true, symbol: "more" }}
                >
                  {blog.content}
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Paragraph className="text-center text-lg text-gray-500">
          No blogs available at the moment.
        </Paragraph>
      )}
    </div>
  );
};

export default BlogsAll;
