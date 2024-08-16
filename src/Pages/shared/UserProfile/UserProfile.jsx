import { useEffect, useState } from "react";
import { Card, Spin, Button, message, Avatar } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          message.error("No authentication token found");
          return;
        }
        const response = await axios.get("https://giyan-udoye.vercel.app/api/v1/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        message.error("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <Spin tip="Loading..." />;

  return (
    <div className="p-2 flex justify-center items-center h-screen ">
      <Card
        title="User Profile"
        className="w-full max-w-md mx-auto text-center space-y-4 bg-gray-50 bg-opacity-70 "
      >
        <Link to="/profile">
          <Avatar
            src={user?.profileImage}
            className="w-44 h-44 object-cover my-2 border rounded-full border-white p-1"
          />
        </Link>
        <p>
          <strong>Name:</strong> {user?.name}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <Button type="primary">Edit Profile</Button>
      </Card>
    </div>
  );
};

export default UserProfile;
