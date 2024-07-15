// src/pages/Profile.js
import { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

const Profile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    // Fetch user profile data
    axios.get('/api/users').then(res => setFormData(res.data));
  }, []);

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async () => {
    try {
      await axios.put('/api/users', formData);
      message.success('Profile updated successfully');
    } catch (err) {
      message.error('Failed to update profile');
    }
  };

  return (
    <Form onFinish={onSubmit} className="p-6">
      <Form.Item label="Name" name="name">
        <Input name="name" value={formData.name} onChange={onChange} />
      </Form.Item>
      <Form.Item label="Email" name="email">
        <Input name="email" value={formData.email} onChange={onChange} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Profile;
