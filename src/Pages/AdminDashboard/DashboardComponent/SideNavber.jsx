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
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, logout } from "../../../redux/slices/authSlice";

const { Title, Text } = Typography;

const items = [
  {
    key: "back",
    icon: <BackwardFilled />,
    label: "Back to Main",
    link: "/",
  },
  {
    key: "Home1",
    icon: <HomeFilled />,
    label: "Home",
    link: "/admin",
    children: [
      {
        key: "h1",
        label: "Blog Management",
        link: "blogs",
      },
      {
        key: "h3",
        label: "Quotes Management",
        link: "quotes",
      },
    ],
  },
  {
    key: "sub1",
    label: "Library Management",
    icon: <BookOutlined />,
    children: [
      { key: "1", label: "All Books", link: "/admin" },
      {
        key: "2",
        label: "Add Library Members",
        link: "library-member",
      },
      {
        key: "3",
        label: "Payment Library Members",
        link: "payment-member",
      },
      {
        key: "4",
        label: "Payment History",
        link: "payment-report",
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
        label: "Student Management",
        link: "student-management",
      },
      {
        key: "7c",
        label: "Subject Management",
        link: "subject-management",
      },
      {
        key: "8c",
        label: "Tutor Management",
        link: "tutor-management",
      },
      { key: "9c", label: "Blocked Users" },
    ],
  },
  {
    key: "9",
    icon: <HistoryOutlined />,
    label: "All Users",
    link: "allusers",
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

  const handleMenuClick = (link) => {
    navigate(link);
    onClose();
  };

  const UserProfileSection = () => (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg mb-4"
    >
      <Link to="/user-profile">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="mb-2"
        >
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
    </motion.div>
  );

  const renderMenuItems = (menuItems) => {
    return menuItems.map((item) => {
      if (item.children) {
        return (
          <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
            {renderMenuItems(item.children)}
          </Menu.SubMenu>
        );
      }
      return (
        <Menu.Item
          key={item.key}
          icon={item.icon}
          onClick={() => handleMenuClick(item.link)}
        >
          {item.label}
        </Menu.Item>
      );
    });
  };

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
        <AnimatePresence>
          {drawerVisible && (
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
                className="border-r-0"
              >
                {renderMenuItems(items)}
              </Menu>
            </Drawer>
          )}
        </AnimatePresence>

        {/* Desktop Sidebar */}
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden lg:block w-64 fixed z-50 h-full overflow-y-auto bg-white shadow-lg"
        >
          <UserProfileSection />
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            className="border-r-0"
          >
            {renderMenuItems(items)}
          </Menu>
        </motion.div>
      </div>
    </>
  );
};

export default SideNavbar;
