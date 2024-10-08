import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Form,
  Input,
  Modal,
  notification,
  Typography,
  Card,
  Space,
  Row,
  Col,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Title } = Typography;

const PaymentManagement = () => {
  const [payments, setPayments] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get(
        "https://giyan-udoye.vercel.app/api/v1/payments"
      );
      setPayments(response.data);
    } catch (error) {
      console.error("Error fetching payments:", error);
      notification.error({ message: "Failed to fetch payments" });
    }
  };
  console.log(payments);
  const handleAddPayment = async (values) => {
    try {
      if (editingPayment) {
        await axios.put(
          `https://giyan-udoye.vercel.app/api/v1/payments/${editingPayment._id}`,
          values
        );
      } else {
        await axios.post(
          "https://giyan-udoye.vercel.app/api/v1/payments",
          values
        );
      }
      setIsModalVisible(false);
      fetchPayments();
      notification.success({ message: "Payment saved successfully!" });
    } catch (error) {
      console.error("Error saving payment:", error);
      notification.error({ message: "Failed to save payment" });
    }
  };

  const handleEdit = (record) => {
    setEditingPayment(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://giyan-udoye.vercel.app/api/v1/payments/${id}`
      );
      fetchPayments();
      notification.success({ message: "Payment deleted successfully!" });
    } catch (error) {
      console.error("Error deleting payment:", error);
      notification.error({ message: "Failed to delete payment" });
    }
  };

  const columns = [
    { title: "ID", dataIndex: "_id", key: "_id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    {
      title: "Payment Date",
      dataIndex: "paymentDate",
      key: "paymentDate",
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            type="primary"
            ghost
          >
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
            danger
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Card>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Title level={2}>Payment Management</Title>
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditingPayment(null);
              form.resetFields();
              setIsModalVisible(true);
            }}
          >
            Add Payment
          </Button>
        </Col>
      </Row>
      <Table
        dataSource={payments}
        columns={columns}
        rowKey="_id"
        scroll={{ x: "max-content" }}
      />

      <Modal
        title={editingPayment ? "Edit Payment" : "Add Payment"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddPayment}>
          <Form.Item
            name="memberId"
            label="Member ID"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="amount" label="Amount" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="paymentDate"
            label="Payment Date"
            rules={[{ required: true }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            name="paymentMethod"
            label="Payment Method"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="transactionId"
            label="Transaction ID"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {editingPayment ? "Update Payment" : "Add Payment"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default PaymentManagement;
