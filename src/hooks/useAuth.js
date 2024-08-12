// src/hooks/useAuth.js
import { useState, useEffect } from "react";
import { message } from "antd";

const useAuth = () => {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      setIsAuthenticated(true);
    } else {
      message.error("No authentication token found");
      setIsAuthenticated(false);
    }
  }, []);

  return { token, isAuthenticated };
};

export default useAuth;
