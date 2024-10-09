import { useEffect, useState } from "react";
import { Menu, Spin, message, Avatar, Button, Drawer, Dropdown } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile, logout } from "../redux/slices/authSlice";
import {
  MenuOutlined,
  CloseOutlined,
  BookOutlined,
  HomeOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
  LoginOutlined,
  DownOutlined,
} from "@ant-design/icons";
import logo from "../assets/logo.jpeg";

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

  if (loading)
    return (
      <Spin
        tip="Loading..."
        size="large"
        className="flex justify-center items-center h-screen"
      />
    );

  const menu = (
    <Menu className="bg-white rounded-lg shadow-lg">
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="sticky top-0 w-full z-50 bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4 text-white">
        <Link
          to="/"
          className="text-white text-3xl font-bold flex items-center space-x-2 hover:opacity-80 transition-opacity duration-300"
        >
          <img
            src={logo}
            alt="Logo"
            className="w-12 h-12 rounded-full shadow-md border-2 border-white"
          />
          <span className="hidden sm:inline">GiyanUdaye</span>
        </Link>

        <div className="hidden lg:flex justify-center items-center text-white">
          <Menu className="bg-transparent flex justify-center items-center gap-6 p-2 border-0 text-white text-lg font-semibold ">
            <Menu.Item key="home" icon={<HomeOutlined />}>
              <Link
                to="/"
                className="hover:text-yellow-300 transition-colors duration-300"
              >
                Home
              </Link>
            </Menu.Item>
            <Menu.Item key="books" icon={<BookOutlined />}>
              <Link
                to="/bookList"
                className="hover:text-yellow-300 transition-colors duration-300"
              >
                Books
              </Link>
            </Menu.Item>
            <Menu.Item key="coaching" icon={<TeamOutlined />}>
              <Link
                to="/coaching"
                className="hover:text-yellow-300 transition-colors duration-300"
              >
                Coaching Center
              </Link>
            </Menu.Item>
            {user?.role === "admin" && (
              <Menu.Item key="admin">
                <Link
                  to="/admin"
                  className="hover:text-yellow-300 transition-colors duration-300"
                >
                  Admin
                </Link>
              </Menu.Item>
            )}
          </Menu>
        </div>

        <div className="hidden lg:flex items-center space-x-4">
          {user ? (
            <Dropdown overlay={menu} trigger={["click"]}>
              <Button
                type="text"
                className="flex items-center text-white hover:text-yellow-300 transition-colors duration-300"
              >
                <Avatar
                  src={user.profileImage}
                  className="mr-2 border-2 border-white"
                />
                <span>{user.name}</span>
                <DownOutlined className="ml-2" />
              </Button>
            </Dropdown>
          ) : (
            <Link to="/login">
              <Button
                type="primary"
                icon={<LoginOutlined />}
                className="bg-yellow-500 text-indigo-900 border-0 hover:bg-yellow-400 shadow-md transition-all duration-300"
              >
                Login
              </Button>
            </Link>
          )}
        </div>

        <div className="lg:hidden">
          <Button
            icon={isDrawerVisible ? <CloseOutlined /> : <MenuOutlined />}
            type="text"
            onClick={toggleDrawer}
            className="text-white text-2xl hover:text-yellow-300 transition-colors duration-300"
          />
        </div>
      </div>

      <Drawer
        title={<span className="text-2xl font-bold text-indigo-600">Menu</span>}
        placement="right"
        onClose={toggleDrawer}
        visible={isDrawerVisible}
        className="lg:hidden"
        bodyStyle={{ padding: 0 }}
      >
        <Menu mode="vertical" className="border-0 text-lg">
          <Menu.Item key="home" icon={<HomeOutlined />} onClick={toggleDrawer}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="books" icon={<BookOutlined />} onClick={toggleDrawer}>
            <Link to="/bookList">Books</Link>
          </Menu.Item>
          <Menu.Item
            key="coaching"
            icon={<TeamOutlined />}
            onClick={toggleDrawer}
          >
            <Link to="/coaching">Coaching Center</Link>
          </Menu.Item>
          {user && (
            <Menu.Item
              key="profile"
              icon={<UserOutlined />}
              onClick={toggleDrawer}
            >
              <Link to="/profile" className="flex items-center space-x-2">
                <Avatar
                  src={user.profileImage}
                  className="border-2 border-indigo-600"
                />
                <span>Profile</span>
              </Link>
            </Menu.Item>
          )}
          {user?.role === "admin" && (
            <Menu.Item key="admin" className="border" onClick={toggleDrawer}>
              <Link to="/admin">Admin Panel</Link>
            </Menu.Item>
          )}
          <Menu.Item key="auth" onClick={toggleDrawer}>
            {user ? (
              <Button
                type="primary"
                icon={<LogoutOutlined />}
                className="bg-red-500 border-0 hover:bg-red-600 w-full shadow-md transition-all duration-300"
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <Link to="/login" className="w-full">
                <Button
                  type="primary"
                  icon={<LoginOutlined />}
                  className="bg-yellow-500 text-indigo-900 border-0 hover:bg-yellow-400 w-full shadow-md transition-all duration-300"
                >
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
