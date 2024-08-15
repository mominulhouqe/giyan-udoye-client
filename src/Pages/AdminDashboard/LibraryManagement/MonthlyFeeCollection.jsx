// src/components/MonthlyFeeCollection.jsx
import React, { useState } from "react";
import axios from "axios";
import { Form, Input, Button, Select, message } from "antd";

const MonthlyFeeCollection = () => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      await axios.post(
        "https://giyan-udoye.vercel.app/api/v1/payments",
        values
      );
      message.success("Payment collected successfully.");
      form.resetFields();
    } catch (error) {
      message.error("Error collecting payment.");
    }
  };

  return (
    <div>
      <h2>Monthly Fee Collection</h2>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="memberId"
          label="Member ID"
          rules={[{ required: true, message: "Please enter member ID" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="amount"
          label="Amount"
          rules={[{ required: true, message: "Please enter the amount" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="month"
          label="Month"
          rules={[{ required: true, message: "Please select a month" }]}
        >
          <Select>
            <Select.Option value="January">January</Select.Option>
            <Select.Option value="February">February</Select.Option>
            {/* Add all months */}
          </Select>
        </Form.Item>
        <Form.Item
          name="year"
          label="Year"
          rules={[{ required: true, message: "Please enter the year" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Collect Fee
        </Button>
      </Form>
    </div>
  );
};

export default MonthlyFeeCollection;
