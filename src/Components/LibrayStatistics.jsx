// src/components/LibraryStatistics.js
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { message, Spin, Card, Row, Col, Statistic } from "antd";
import { UserOutlined, BookOutlined } from "@ant-design/icons";
import axios from "axios";
import { fetchUsers } from "../redux/slices/userSlice";

const LibraryStatistics = () => {
  const dispatch = useDispatch();
  const { token, isAuthenticated } = useSelector((state) => state.auth);
  const { users, loading, error } = useSelector((state) => state.users);
  const [books, setBooks] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUsers(token));
    }
  }, [dispatch, isAuthenticated, token]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("api/v1/books");
        setBooks(response.data);
      } catch (error) {
        console.error("Failed to fetch books", error);
        message.error("Failed to fetch books");
      } finally {
        setLoadingBooks(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="py-12 bg-gradient-to-r from-blue-100 to-purple-100 m-3 rounded-lg shadow-lg">
      <h2 className="text-4xl text-center font-bold mb-8 text-indigo-700">
        Library Statisticsd
      </h2>
      <Row gutter={16} justify="center">
        <Col xs={24} sm={12} md={8}>
          <Card
            hoverable
            className="text-center shadow-md transition-all duration-300 transform hover:scale-105"
          >
            {users ? (
              loading ? (
                <Spin size="large" />
              ) : error ? (
                <p className="text-red-500">Failed to load users</p>
              ) : (
                <Statistic
                  title="Registered Users"
                  value={users.length}
                  prefix={<UserOutlined />}
                  valueStyle={{ color: "#3f8600", fontSize: "2.5rem" }}
                />
              )
            ) : (
              <p className="text-red-500">Login First If you want to see</p>
            )}
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card
            hoverable
            className="text-center shadow-md transition-all duration-300 transform hover:scale-105"
          >
            {loadingBooks ? (
              <Spin size="large" />
            ) : (
              <Statistic
                title="Total Books"
                value={books.length}
                prefix={<BookOutlined />}
                valueStyle={{ color: "#1890ff", fontSize: "2.5rem" }}
              />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LibraryStatistics;
