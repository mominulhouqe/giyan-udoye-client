// Register.jsx
import  { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await axios.post('/api/auth/register', values);
      notification.success({
        message: 'Registration Successful',
        description: 'You can now log in with your new account.',
      });
      navigate('/login');
    } catch (error) {
      notification.error({
        message: 'Registration Failed',
        description: error.response?.data?.message || 'An error occurred during registration.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Register</h1>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter your name' }]}>
          <Input placeholder="Enter your name" />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please enter your email' }, { type: 'email', message: 'Invalid email format' }]}>
          <Input placeholder="Enter your email" />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please enter your password' }, { min: 6, message: 'Password must be at least 6 characters' }]}>
          <Input.Password placeholder="Enter your password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} className="w-full">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
