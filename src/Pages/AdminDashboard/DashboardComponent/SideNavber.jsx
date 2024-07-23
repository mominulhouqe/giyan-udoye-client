import { useState } from "react";
import {
  AppstoreOutlined,
BookOutlined,
  MenuOutlined,
  UserAddOutlined,
  HistoryOutlined,
  HomeFilled ,
  BackwardFilled
} from "@ant-design/icons";

import { Button, Menu, Drawer } from "antd";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";



const items = [
  {
    key: "back",
   icon:<BackwardFilled></BackwardFilled>,
    label: <NavLink to="/" >Back to Main</NavLink>,
  },
  {
    key: "Home1",
    icon:<HomeFilled />,
    label: <NavLink to="/admin">Home</NavLink>,
  },
  {
    key: "sub1",
    label: "Library Management",
    icon: < BookOutlined />,
    children: [
      { key: "1", label: <NavLink to="all-books">All Books</NavLink> },
      { key: "2", label:<NavLink to="library-memebers">Library-memebers</NavLink> },
    ],
  },
  {
    key: "sub2",
    label: "Coaching Management",
    icon: <AppstoreOutlined />,
    children: [
      { key: "5", label: <NavLink to="coaching-all-student">All Students</NavLink> },

      { key: "7", label:<NavLink to="running-student">Running Sutdent</NavLink> },
      { key: "7", label:<NavLink to="add-student">Add Sutdent</NavLink> },
      { key: "8", label: "Blocked User's" },

    ],
  },

  {
    key: "9",
    icon:<HistoryOutlined></HistoryOutlined>,
    label: <NavLink to="allusers">All User's</NavLink>,
  },
];

const SideNavbar = () => {
  const [current, setCurrent] = useState("1");
  const [drawerVisible, setDrawerVisible] = useState(false);
  
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
      <div className="w-full lg:w-72 lg:min-h-screen bg-gray-200 border-r border-gray-200 shadow-md">
        {/* Mobile Menu Button */}
        <div className="lg:hidden p-4">
          <Button type="primary" onClick={showDrawer}>
            <MenuOutlined />
          </Button>
        </div>

        {/* Drawer for Mobile */}
        <Drawer
          title="Menu"
          placement="left"
          onClose={onClose}
          open={drawerVisible}
          width={256}
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
          <div className="flex flex-col items-center p-4 border-b border-gray-200">
            <Link to="/user-profile">
           
                <motion.img
                  src=""
                  alt="Profile"
                  className="rounded-full w-20 h-20 border-2 border-blue-500"
                />
     
                <div className="rounded-full bg-gray-200 w-20 h-20 flex items-center justify-center border-2 border-blue-500">
                  <UserAddOutlined className="text-4xl text-gray-500" />
                </div>
                     </Link>
            <span className="mt-2 text-lg font-semibold">name</span>
            <span className="text-sm text-gray-600">
              Role: 
            </span>
          </div>

          {/* Menu */}
          <Menu
            defaultSelectedKeys={["1"]}
            onClick={onClick}
            selectedKeys={[current]}
            mode="inline"
            items={items}
            className="mt-4 bg-gray-200"
          />
        </div>
      </div>
    </>
  );
};

export default SideNavbar;
