// src/pages/UserProfile.jsx
import  { useEffect, useState } from 'react';
import { Card, Spin, Button, message } from 'antd';
import axios from 'axios';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          message.error('No authentication token found');
          return;
        }
        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        message.error('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };
    

    fetchUser();
  }, []);

  if (loading) return <Spin tip="Loading..." />;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card title="User Profile" className="w-full max-w-md">
        <p><strong>Name:</strong> Eiden</p>
        <p><strong>Email:</strong> -Eiden@gmail.com</p>
        {/* <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p> */}
        <Button type="primary">Edit Profile</Button>
      </Card>
    </div>
  );
};

export default UserProfile;
