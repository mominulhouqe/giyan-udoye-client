// src/hooks/useFetchUsers.js
import { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";

const useFetchUsers = (token) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) {
        message.error("No authentication token found");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (error) {
        message.error("Failed to fetch users data");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  return { users, loading };
};

export default useFetchUsers;
