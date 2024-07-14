
import React from 'react';
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
const Navber = () => {
//   const {user, setUsers}=useState();

// useEffect(() => {
// // Fetch user profile data
// axios.get('/api/users').then(res => setUsers(res.data));
// }, []);
// console.log(user);
  return (
    <div>

<Menu mode="horizontal">
  <Menu.Item key="home">
    <Link to="/">Home</Link>
  </Menu.Item>
  <Menu.Item key="books">
    <Link to="/bookList">Books</Link>
  </Menu.Item>
  {}
  <Menu.Item key="profile">
    <Link to="/profile">Profile</Link>
  </Menu.Item>
  <Menu.Item key="admin">
    <Link to="/admin">Admin</Link>
  </Menu.Item>
</Menu>
    </div>
  );
};

export default Navber;