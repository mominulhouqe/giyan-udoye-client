// src/components/ReportView.jsx
import { useState } from "react";
import axios from "axios";
import {
  Form,
  Input,
  Select,
  Button,
  Table,
  message,
  Typography,
  Card,
  Space,
  Divider,
  Row,
  Col,
} from "antd";

const { Title, Text } = Typography;

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
      console.log(response.data);
      setReport(response.data);
    } catch (error) {
      message.error("Error fetching yearly report.");
    }
    setLoading(false);
  };

  const columns = [
    { title: "Member ID", dataIndex: ["memberId", "_id"], key: "memberId" },
    { title: "Name", dataIndex: ["memberId", "name"], key: "name" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    { title: "Payment Date", dataIndex: "paymentDate", key: "paymentDate" },
  ];

  return (
    <Card className=" p-0 m-0 w-full">
      <Title level={2}>Reports</Title>
      <Divider />
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Card title="Monthly Report" size="small">
              <Form layout="vertical" onFinish={handleFetchMonthlyReport}>
                <Form.Item
                  name="month"
                  label="Month"
                  rules={[{ required: true }]}
                >
                  <Select style={{ width: "100%" }}>
                    {[
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December",
                    ].map((month) => (
                      <Select.Option key={month} value={month}>
                        {month}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="year"
                  label="Year"
                  rules={[{ required: true }]}
                >
                  <Input type="number" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Get Monthly Report
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Card title="Yearly Report" size="small">
              <Form layout="vertical" onFinish={handleFetchYearlyReport}>
                <Form.Item
                  name="year"
                  label="Year"
                  rules={[{ required: true }]}
                >
                  <Input type="number" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Get Yearly Report
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>

        {report && (
          <Card
            title={
              <Title level={4}>
                {report.month
                  ? `Monthly Report: ${report.month} ${report.year}`
                  : `Yearly Report: ${report.year}`}
              </Title>
            }
          >
            <Text strong>Total Amount: {report.totalAmount}</Text>
            <Table
              dataSource={report.payments}
              columns={columns}
              loading={loading}
              rowKey="_id"
              style={{ marginTop: 16 }}
              scroll={{ x: true }}
            />
          </Card>
        )}
      </Space>
    </Card>
  );
};

export default ReportView;
