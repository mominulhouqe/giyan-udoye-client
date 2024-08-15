// src/components/PaymentManagement.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Form, Input, Modal, notification } from "antd";

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
    }
  };

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
    { title: "Amount", dataIndex: "amount", key: "amount" },
    { title: "Payment Date", dataIndex: "paymentDate", key: "paymentDate" },
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
      render: (text, record) => (
        <>
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button
            onClick={() => handleDelete(record._id)}
            type="danger"
            style={{ marginLeft: 8 }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setEditingPayment(null);
          form.resetFields();
          setIsModalVisible(true);
        }}
      >
        Add Payment
      </Button>
      <Table
        scroll={{ x: "100%", y: 500 }}
        dataSource={payments}
        columns={columns}
        rowKey="_id"
      />

      <Modal
        title={editingPayment ? "Edit Payment" : "Add Payment"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleAddPayment}>
          <Form.Item name="memberId" label="Member ID">
            <Input />
          </Form.Item>
          <Form.Item name="amount" label="Amount">
            <Input type="number" />
          </Form.Item>
          <Form.Item name="paymentDate" label="Payment Date">
            <Input type="date" />
          </Form.Item>
          <Form.Item name="paymentMethod" label="Payment Method">
            <Input />
          </Form.Item>
          <Form.Item name="transactionId" label="Transaction ID">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PaymentManagement;
