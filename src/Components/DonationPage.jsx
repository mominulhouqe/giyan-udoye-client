import React, { useState } from "react";
import { Form, Input, Button, Select, message } from "antd";

const DonationPage = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Make API call to process the donation
      // For example: await axios.post("/api/donations", values);
      
      message.success("Thank you for your donation!");
      setLoading(false);
    } catch (error) {
      message.error("Failed to process the donation.");
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 text-white">
      <div>
      <h1 className="text-5xl font-bold text-center mb-6 ">Donate to GiyanUday Islamic Library</h1>
      <p className="text-center mb-8 text-lg text-gray-200">
        Your donations help us continue our mission of providing free access to Islamic literature and resources.
      </p>
      </div>

      <div className="max-w-lg  w-full mx-auto bg-white p-8 rounded-lg shadow-md">
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input type="email" placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Donation Amount"
            name="amount"
            rules={[{ required: true, message: "Please enter the donation amount" }]}
          >
            <Input type="number" placeholder="Enter donation amount" />
          </Form.Item>

          <Form.Item
            label="Payment Method"
            name="paymentMethod"
            rules={[{ required: true, message: "Please select a payment method" }]}
          >
            <Select placeholder="Select payment method">
              <Select.Option value="creditCard">Credit Card</Select.Option>
              <Select.Option value="paypal">PayPal</Select.Option>
              <Select.Option value="bankTransfer">Bank Transfer</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} className="w-full">
              Donate Now
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default DonationPage;
