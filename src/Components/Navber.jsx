import React, { useEffect, useState } from "react";
import { Menu, Spin, message, Avatar, Button, Drawer } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile, logout } from "../redux/slices/authSlice";
import { HomeOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons";
import logo from '../assets/logo.jpeg'
const Navber = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    message.success("Successfully logged out");
  };

  const toggleDrawer = () => {
    setIsDrawerVisible(!isDrawerVisible);
  };

  if (loading) return <Spin tip="Loading..." />;

  return (
    <div className="sticky top-0 w-full z-20 bg-[#D2B48C] shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-white text-3xl font-bold flex items-center space-x-2">
            <img src={logo} alt="Logo" className="w-12 h-12 rounded-full"/>
            <span>GiyanUdaye</span>
          </Link>
        </div>
        <div className="hidden md:flex flex-grow justify-center items-center space-x-4 text-white">
          <Menu mode="horizontal" className="bg-transparent md:ml-10 w-full border-0 text-white text-lg font-semibold">
            <Menu.Item key="home" className="text-white">
              <Link to="/" >Home</Link>
            </Menu.Item>
            <Menu.Item key="books" className="">
             
              <Link to="/bookList">Books</Link>
            </Menu.Item>
            <Menu.Item key="coaching" className="">
              <Link to="/coaching">Coaching Center</Link>
            </Menu.Item>
            {user && (
              <Menu.Item key="profile" className="">
                <Link to="/profile" className="flex items-center space-x-2">
                  <Avatar src={user.profileImage} />
                  <span>Profile</span>
                </Link>
              </Menu.Item>
            )}
            {user?.role === "admin" && (
              <Menu.Item key="admin" className="">
                <Link to="/admin">Admin</Link>
              </Menu.Item>
            )}
          </Menu>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <Button type="primary" className="bg-red-500 border-0 hover:bg-red-600" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button type="primary" className="bg-green-500 border-0 hover:bg-green-600">
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <Button
            icon={isDrawerVisible ? <CloseOutlined /> : <MenuOutlined />}
            type="primary"
            onClick={toggleDrawer}
            className="bg-transparent border-none text-white text-2xl"
          />
        </div>
      </div>

      {/* Drawer for Mobile Menu */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={toggleDrawer}
        visible={isDrawerVisible}
        className="md:hidden"
      >
        <Menu mode="vertical" className="border-0 text-lg">
          <Menu.Item key="home" onClick={toggleDrawer}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="books" onClick={toggleDrawer}>
            <Link to="/bookList">Books</Link>
          </Menu.Item>
          <Menu.Item key="coaching" onClick={toggleDrawer}>
            <Link to="/coaching">Coaching Center</Link>
          </Menu.Item>
          {user && (
            <Menu.Item key="profile" onClick={toggleDrawer}>
              <Link to="/profile">
                <Avatar src={user.profileImage} style={{ marginRight: 8 }} />
                Profile
              </Link>
            </Menu.Item>
          )}
          {user?.role === "admin" && (
            <Menu.Item key="admin" onClick={toggleDrawer}>
              <Link to="/admin">Admin</Link>
            </Menu.Item>
          )}
          <Menu.Item key="auth" onClick={toggleDrawer}>
            {user ? (
              <Button type="primary" className="bg-red-500 border-0 hover:bg-red-600 w-full" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Link to="/login">
                <Button type="primary" className="bg-green-500 border-0 hover:bg-green-600 w-full">
                  Login
                </Button>
              </Link>
            )}
          </Menu.Item>
        </Menu>
      </Drawer>
    </div>
  );
};

export default Navber;
