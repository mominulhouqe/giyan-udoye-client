/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spin } from "antd";

const AuthenticatedRoute = ({ children }) => {
  const { user, loading } = useSelector((state) => state.auth);
  const location = useLocation(); // Ensure location is defined

  if (loading) {
    return <Spin tip="Loading..." />; // Display spinner while loading
  }

  if (user) {
    return <>{children}</>; // Render children if authenticated
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AuthenticatedRoute;
