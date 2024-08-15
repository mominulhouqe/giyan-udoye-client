import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Input, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const LibraryMemberList = () => {
  const [members, setMembers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get("/api/library-members");
      setMembers(response.data);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const handleAddMember = async (values) => {
    try {
      if (editingMember) {
        await axios.put(`/api/library-members/${editingMember._id}`, values);
      } else {
        await axios.post("/api/library-members", values);
      }
      setIsModalVisible(false);
      fetchMembers();
      notification.success({ message: "Member saved successfully!" });
    } catch (error) {
      console.error("Error saving member:", error);
      notification.error({ message: "Failed to save member" });
    }
  };

  const handleEdit = (record) => {
    setEditingMember(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/library-members/${id}`);
      fetchMembers();
      notification.success({ message: "Member deleted successfully!" });
    } catch (error) {
      console.error("Error deleting member:", error);
      notification.error({ message: "Failed to delete member" });
    }
  };

  const columns = [
    { title: "ID", dataIndex: "_id", key: "_id" }, // Ensure this matches the field in your data
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    {
      title: "Subscription Fee",
      dataIndex: "subscriptionFee",
      key: "subscriptionFee",
    },
    {
      title: "Subscription Due Date",
      dataIndex: "subscriptionDueDate",
      key: "subscriptionDueDate",
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
        icon={<PlusOutlined />}
        onClick={() => {
          setEditingMember(null);
          form.resetFields();
          setIsModalVisible(true);
        }}
      >
        Add Member
      </Button>
      <Table dataSource={members} columns={columns} rowKey="_id" />

      <Modal
        title={editingMember ? "Edit Member" : "Add Member"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleAddMember}>
          <Form.Item name="memberId" label="Member ID" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="subscriptionFee"
            label="Subscription Fee"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="subscriptionDueDate"
            label="Subscription Due Date"
            rules={[{ required: true }]}
          >
            <Input type="date" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LibraryMemberList;
