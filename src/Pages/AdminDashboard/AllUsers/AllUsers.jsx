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
    <div>
      <h2 className="py-4 mb-2 text-2xl font-bold underline text-center bg-gray-200"> All User's Page</h2>
    <div className="w-full ">
      <Card title="All Users" className="w-full ">
        {users.map((user) => (
          <p key={user._id}>
            <strong>Name:</strong> {user.name} | <strong>Email:</strong>{" "}
            {user.email}
            <button>Delete</button>
            <button>make Admin</button>
            <button>make faculty</button>

          </p>
        ))}
      </Card>
    </div>
    </div>
  );
};

export default AllUsers;
