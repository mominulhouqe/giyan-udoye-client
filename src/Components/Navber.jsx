import React from "react";
import { Menu, Spin, message, Avatar } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navber = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          message.error(message);
          return;
        }
        const response = await axios.get("api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        message.error("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
    message.success("Successfully logged out");
  };

  if (loading) return <Spin tip="Loading..." />;

  return (
    <div className="sticky top-0  w-full  z-20">
      <Menu mode="horizontal" className=" bg-gray-200 p-2 border-0 ">
        <Menu.Item key="home">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="books">
          <Link to="/bookList">Books</Link>
        </Menu.Item>
        {user ? (
          <>
            <Menu.Item key="profile">
              <Link to="/profile">
                <Avatar src={user.profileImage} style={{ marginRight: 8 }} />
                Profile
              </Link>
            </Menu.Item>
            {user.role === "admin" && (
              <Menu.Item key="admin">
                <Link to="/admin">Admin</Link>
              </Menu.Item>
            )}
            <Menu.Item key="logout" onClick={handleLogout}>
              Logout
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item key="login">
              <Link to="/login">Login</Link>
            </Menu.Item>
          </>
        )}
      </Menu>
    </div>
  );
};

export default Navber;
