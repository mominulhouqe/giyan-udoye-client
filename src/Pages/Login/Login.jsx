// Login.jsx
import { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/auth/login', values);
      const { token } = response.data;
      localStorage.setItem('token', token);
      notification.success({
        message: 'Login Successful',
        description: 'Welcome back!',
      });
      navigate('/');
    } catch (error) {
      notification.error({
        message: 'Login Failed',
        description: error.response?.data?.message || 'An error occurred during login.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please enter your email' }, { type: 'email', message: 'Invalid email format' }]}>
          <Input placeholder="Enter your email" />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please enter your password' }]}>
          <Input.Password placeholder="Enter your password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} className="w-full">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
