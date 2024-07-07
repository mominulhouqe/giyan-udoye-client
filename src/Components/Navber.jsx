// src/components/Navbar.js

import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <Menu mode="horizontal">
    
    <Menu.Item key="home">
      <Link to="/">Home</Link>
    </Menu.Item>
    <Menu.Item key="books">
      <Link to="/bookList">Books</Link>
    </Menu.Item>
    <Menu.Item key="profile">
      <Link to="/profile">Profile</Link>
    </Menu.Item>
    <Menu.Item key="admin">
      <Link to="/admin">Admin</Link>
    </Menu.Item>
  </Menu>
);

export default Navbar;
