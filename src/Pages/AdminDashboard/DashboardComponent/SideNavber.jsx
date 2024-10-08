import { useState, useEffect } from "react";
import {
  AppstoreOutlined,
  BookOutlined,
  MenuOutlined,
  UserOutlined,
  HistoryOutlined,
  HomeFilled,
  BackwardFilled,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Menu, Drawer, message, Avatar, Typography } from "antd";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, logout } from "../../../redux/slices/authSlice";

const { Title, Text } = Typography;

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
    children: [
      {
        key: "h1",
        label: <NavLink to="blogs">Blog Management</NavLink>,
      },
      {
        key: "h3",
        label: <NavLink to="quotes">Quotes Management</NavLink>,
      },
    ],
  },
  {
    key: "sub1",
    label: "Library Management",
    icon: <BookOutlined />,
    children: [
      { key: "1", label: <NavLink to="/admin">All Books</NavLink> },
      {
        key: "2",
        label: <NavLink to="library-member">Add Library Members</NavLink>,
      },
      {
        key: "3",
        label: <NavLink to="payment-member">Payment Library Members</NavLink>,
      },
      {
        key: "4",
        label: <NavLink to="payment-report">Payment History</NavLink>,
      },
    ],
  },
  {
    key: "sub2",
    label: "Coaching Management",
    icon: <AppstoreOutlined />,
    children: [
      {
        key: "6c",
        label: <NavLink to="student-management">Student Management</NavLink>,
      },
      {
        key: "7c",
        label: <NavLink to="subject-management">Subject Management</NavLink>,
      },
      {
        key: "8c",
        label: <NavLink to="tutor-management">Tutor Management</NavLink>,
      },
      { key: "9c", label: "Blocked Users" },
    ],
  },
  {
    key: "9",
    icon: <HistoryOutlined />,
    label: <NavLink to="allusers">All Users</NavLink>,
  },
];

const SideNavbar = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, error } = useSelector((state) => state.auth);

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

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
  };

  const UserProfileSection = () => (
    <div className="flex flex-col items-center p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg mb-4">
      <Link to="/user-profile">
        <motion.div whileHover={{ scale: 1.1 }} className="mb-2">
          <Avatar
            size={64}
            src={user?.profileImage}
            icon={<UserOutlined />}
            className="border-2 border-white"
          />
        </motion.div>
      </Link>
      <Title level={4} className="text-white m-0">
        {user?.name || "User Name"}
      </Title>
      <Text className="text-white opacity-75">
        Role: {user?.role || "User"}
      </Text>
      <Button
        type="default"
        icon={<LogoutOutlined />}
        onClick={handleLogout}
        className="mt-2 hover:bg-red-500 hover:text-white transition-colors"
      >
        Logout
      </Button>
    </div>
  );

  return (
    <>
      <div className="lg:min-h-screen bg-gray-100">
        {/* Mobile Menu Button */}
        <div className="lg:hidden p-4">
          <Button
            type="primary"
            shape="circle"
            icon={<MenuOutlined />}
            onClick={showDrawer}
            className="bg-blue-500 hover:bg-blue-600"
          />
        </div>

        {/* Drawer for Mobile */}
        <Drawer
          title="Dashboard Menu"
          placement="left"
          onClose={onClose}
          open={drawerVisible}
          width={300}
          bodyStyle={{ padding: 0 }}
        >
          <UserProfileSection />
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            items={items}
            className="border-r-0"
          />
        </Drawer>

        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 fixed z-50 h-full overflow-y-auto bg-white shadow-lg">
          <UserProfileSection />
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            items={items}
            className="border-r-0"
          />
        </div>
      </div>
    </>
  );
};

export default SideNavbar;
