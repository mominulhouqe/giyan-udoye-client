import { useEffect, useState } from "react";
import { Card, Spin, Button, message, Avatar, Typography } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import { EditOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

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
        const response = await axios.get(
          "https://giyan-udoye.vercel.app/api/v1/users/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(response.data);
      } catch (error) {
        message.error("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading)
    return (
      <Spin
        size="large"
        className="flex justify-center items-center h-screen"
      />
    );

  return (
    <div className="p-4 flex justify-center items-center h-[calc(100vh-345px)]">
      <Card
        className="w-full max-w-md mx-auto text-center space-y-6 shadow-lg rounded-lg overflow-hidden"
        cover={
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-32" />
        }
      >
        <div className="relative -mt-16">
          <Link to="/profile">
            <Avatar
              src={user?.profileImage}
              icon={<UserOutlined />}
              className="w-32 h-32 object-cover border-4 border-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-300"
            />
          </Link>
        </div>
        <Title level={2} className="mt-4 text-gray-800">
          {user?.name}
        </Title>
        <div className="space-y-2">
          <Text className="flex items-center justify-center text-gray-600">
            <MailOutlined className="mr-2" /> {user?.email}
          </Text>
        </div>
        <Button
          type="primary"
          icon={<EditOutlined />}
          size="large"
          className="mt-4 hover:bg-blue-600 transition-colors duration-300"
        >
          Edit Profile
        </Button>
      </Card>
    </div>
  );
};

export default UserProfile;
