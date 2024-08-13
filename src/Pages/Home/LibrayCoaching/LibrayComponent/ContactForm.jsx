import React from 'react';
import { Button,  Form, Input, message } from 'antd';
const ContactForm = () => {
    const onFinish = (values) => {
        message.success('Your inquiry has been sent successfully!');
      };
    
    return (
        <div>
            <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Contact Us</h2>
        <Form
          name="contact"
          onFinish={onFinish}
          className="max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg"
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Please enter your name!' }]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, type: 'email', message: 'Please enter a valid email!' }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="message"
            rules={[{ required: true, message: 'Please enter your message!' }]}
          >
            <Input.TextArea rows={4} placeholder="Message" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">Send Inquiry</Button>
          </Form.Item>
        </Form>
      </div>
        </div>
    );
};

export default ContactForm;