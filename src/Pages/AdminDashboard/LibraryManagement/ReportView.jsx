// src/components/ReportView.jsx
import React, { useState } from "react";
import axios from "axios";
import { Form, Input, Select, Button, Table, message } from "antd";

const ReportView = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetchMonthlyReport = async (values) => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://giyan-udoye.vercel.app/api/v1/payments/monthly-report",
        {
          params: values,
        }
      );
      setReport(response.data);
    } catch (error) {
      message.error("Error fetching monthly report.");
    }
    setLoading(false);
  };

  const handleFetchYearlyReport = async (values) => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://giyan-udoye.vercel.app/api/v1/payments/yearly-report",
        {
          params: { year: values.year },
        }
      );
      setReport(response.data);
    } catch (error) {
      message.error("Error fetching yearly report.");
    }
    setLoading(false);
  };

  const columns = [
    { title: "Member ID", dataIndex: ["memberId", "_id"], key: "memberId" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    { title: "Payment Date", dataIndex: "paymentDate", key: "paymentDate" },
  ];
  console.log(report);

  return (
    <div>
      <h2>Reports</h2>

      <Form layout="inline" onFinish={handleFetchMonthlyReport}>
        <Form.Item
          className="w-44"
          name="month"
          label="Month"
          rules={[{ required: true }]}
        >
          <Select>
            <Select.Option value="January">January</Select.Option>
            <Select.Option value="February">February</Select.Option>
            <Select.Option value="March">March</Select.Option>
            <Select.Option value="April">April</Select.Option>
            <Select.Option value="May">May</Select.Option>
            <Select.Option value="Jun">Jun</Select.Option>
            <Select.Option value="July">July</Select.Option>
            <Select.Option value="August">August</Select.Option>
            <Select.Option value="September">September</Select.Option>
            <Select.Option value="October">October</Select.Option>
            <Select.Option value="Novbember">Novbember</Select.Option>
            <Select.Option value="December">December</Select.Option>
            {/* Add all months */}
          </Select>
        </Form.Item>
        <Form.Item name="year" label="Year" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Get Monthly Report
        </Button>
      </Form>

      <Form layout="inline" onFinish={handleFetchYearlyReport} className="mt-4">
        <Form.Item name="year" label="Year" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Get Yearly Report
        </Button>
      </Form>

      {report && (
        <div className="mt-4">
          <h3>
            {report.month
              ? `Monthly Report: ${report.month} ${report.year}`
              : `Yearly Report: ${report.year}`}
          </h3>
          <p>Total Amount: {report.totalAmount}</p>
          <Table
            dataSource={report.payments}
            columns={columns}
            loading={loading}
            rowKey="_id"
          />
        </div>
      )}
    </div>
  );
};

export default ReportView;
