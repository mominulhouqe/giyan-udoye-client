import React, { useEffect } from "react";
import { Menu, Spin, message, Avatar } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile, logout } from "../redux/slices/authSlice";

const Navber = () => {
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

  if (loading) return <Spin tip="Loading..." />;

  return (
    <div className="sticky top-0 w-full z-20">
      <Menu mode="horizontal" className="bg-gray-200 p-4 border-0 text-lg font-medium">
        <Menu.Item key="home">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="books">
          <Link to="/bookList">Books</Link>
        </Menu.Item>
        <Menu.Item key="coaching">
          <Link to="/coaching">Coaching Center</Link>
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
          <Menu.Item key="login">
            <Link to="/login">Login</Link>
          </Menu.Item>
        )}
      </Menu>
    </div>
  );
};

export default Navber;
