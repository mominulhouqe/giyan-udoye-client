import { useState, useEffect } from "react";
import {
  AppstoreOutlined,
  BookOutlined,
  MenuOutlined,
  UserAddOutlined,
  HistoryOutlined,
  HomeFilled,
  BackwardFilled,
} from "@ant-design/icons";
import { Button, Menu, Drawer, message } from "antd";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, logout } from "../../../redux/slices/authSlice";

const items = [
  {
    key: "back",
    icon: <BackwardFilled />,
    label: <NavLink to="/">Back to Main</NavLink>,
  },
  {
    key: "Home1",
    icon: <HomeFilled />,
    label: <NavLink to="/admin">Home</NavLink>,
  },
  {
    key: "sub1",
    label: "Library Management",
    icon: <BookOutlined />,
    children: [
      { key: "1", label: <NavLink to="all-books">All Books</NavLink> },
      { key: "2", label: <NavLink to="library-memebers">Library Members</NavLink> },
    ],
  },
  {
    key: "sub2",
    label: "Coaching Management",
    icon: <AppstoreOutlined />,
    children: [
      { key: "6c", label: <NavLink to="student-management">Student Management</NavLink> },
      { key: "7c", label: <NavLink to="subject-management">Subject Management</NavLink> },
      { key: "8", label: "Blocked Users" },
    ],
  },
  {
    key: "9",
    icon: <HistoryOutlined />,
    label: <NavLink to="allusers">All Users</NavLink>,
  },
];

const SideNavbar = () => {
  const [current, setCurrent] = useState("1");
  const [drawerVisible, setDrawerVisible] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const onClick = (e) => {
    setCurrent(e.key);
  };

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
  };

  return (
    <>
      <div className="lg:min-h-screen bg-gray-100 shadow-xl">
        {/* Mobile Menu Button */}
        <div className="lg:hidden p-4">
          <Button
            type="primary"
            shape="round"
            icon={<MenuOutlined />}
            onClick={showDrawer}
            className="text-white bg-blue-700"
          >
            Menu
          </Button>
        </div>

        {/* Drawer for Mobile */}
        <Drawer
          title="Menu"
          placement="left"
          onClose={onClose}
          open={drawerVisible}
          width={256}
          bodyStyle={{ backgroundColor: "#f0f2f5" }}
        >
          <Menu
            defaultSelectedKeys={["1"]}
            onClick={onClick}
            selectedKeys={[current]}
            mode="inline"
            items={items}
          />
        </Drawer>

        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          {/* User Profile Section */}
          <div className="flex flex-col items-center p-2 bg-white shadow-lg rounded-lg mt-4 mx-4">
            <Link to="/user-profile">
              <motion.div
                className="rounded-full w-24 h-24 overflow-hidden border-4 border-blue-500 shadow-lg"
                whileHover={{ scale: 1.1 }}
              >
                {user?.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="rounded-full bg-gray-200 w-full h-full flex items-center justify-center">
                    <UserAddOutlined className="text-4xl text-gray-500" />
                  </div>
                )}
              </motion.div>
            </Link>
            <span className="mt-4 text-xl font-semibold text-gray-800">{user?.name || "User Name"}</span>
            <span className="text-sm text-gray-500">Role: {user?.role || "User"}</span>
            <Button
              type="primary"
              danger
              onClick={handleLogout}
              className="mt-2"
            >
              Logout
            </Button>
          </div>

          {/* Menu */}
          <Menu
            defaultSelectedKeys={["1"]}
            onClick={onClick}
            selectedKeys={[current]}
            mode="inline"
            items={items}
            className="mt-4 bg-white shadow-lg rounded-lg mx-4"
          />
        </div>
      </div>
    </>
  );
};

export default SideNavbar;
