import { useEffect, useState } from "react";
import { Card, Spin, message, Button, Modal, Tag } from "antd";
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
        const response = await axios.get(
          "https://giyan-udoye.vercel.app/api/v1/users",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUsers(response.data);
      } catch (error) {
        message.error("Failed to fetch users data");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://giyan-udoye.vercel.app/api/v1/users/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      message.success("User deleted successfully");
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      message.error("Failed to delete user");
    }
  };

  const handleRoleChange = async (userId, role) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `https://giyan-udoye.vercel.app/api/v1/users/${userId}`,
        { role },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      message.success(`User role updated to ${role}`);
      setUsers(
        users.map((user) => (user._id === userId ? { ...user, role } : user))
      );
    } catch (error) {
      message.error("Failed to update user role");
    }
  };

  if (loading) return <Spin tip="Loading..." className="block mx-auto mt-20" />;

  return (
    <div className="container mx-auto p-6 lg:p-12">
      <h2 className="py-4 mb-6 text-3xl font-bold text-center text-gray-800">
        All Users
      </h2>
      <Card title="User List" className="shadow-lg rounded-lg bg-white">
        {users.length === 0 ? (
          <p className="text-center text-gray-500">No users found</p>
        ) : (
          users.map((user) => (
            <div
              key={user._id}
              className="border-b border-gray-300 py-4 flex items-center justify-between"
            >
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {user.name}
                </h3>
                <p className="text-gray-600">{user.email}</p>
                {user.role && (
                  <Tag color="blue" className="mt-2">
                    Role: {user.role}
                  </Tag>
                )}
              </div>
              <div className="flex space-x-2">
                <Button
                  type="danger"
                  size="small"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </Button>
                <Button
                  type="primary"
                  size="small"
                  onClick={() => handleRoleChange(user._id, "admin")}
                >
                  Make Admin
                </Button>
                <Button
                  type="default"
                  size="small"
                  onClick={() => handleRoleChange(user._id, "faculty")}
                >
                  Make Faculty
                </Button>
              </div>
            </div>
          ))
        )}
      </Card>
    </div>
  );
};

export default AllUsers;
