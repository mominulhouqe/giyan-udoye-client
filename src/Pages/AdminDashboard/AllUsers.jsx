import { useEffect, useState } from "react";
import { Card, Spin, message } from "antd";
import axios from "axios";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          message.error("No authentication token found");
          return;
        }
        const response = await axios.get("http://localhost:5000/api/users", {
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
  }, []);

  if (loading) return <Spin tip="Loading..." />;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card title="All Users" className="w-full max-w-4xl">
        {users.map((user) => (
          <p key={user._id}>
            <strong>Name:</strong> {user.name} | <strong>Email:</strong>{" "}
            {user.email}
          </p>
        ))}
      </Card>
    </div>
  );
};

export default AllUsers;
