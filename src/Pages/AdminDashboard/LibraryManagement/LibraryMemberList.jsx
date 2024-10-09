import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  notification,
  Space,
  Typography,
  InputNumber,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Title } = Typography;

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
      const response = await axios.get(
        "https://giyan-udoye.vercel.app/api/v1/library-members"
      );
      setMembers(response.data);
    } catch (error) {
      console.error("Error fetching members:", error);
      notification.error({ message: "Failed to fetch members" });
    }
  };

  const handleAddMember = async (values) => {
    try {
      if (editingMember) {
        await axios.put(
          `https://giyan-udoye.vercel.app/api/v1/library-members/${editingMember._id}`,
          values
        );
      } else {
        await axios.post(
          "https://giyan-udoye.vercel.app/api/v1/library-members",
          values
        );
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
      await axios.delete(
        `https://giyan-udoye.vercel.app/api/v1/library-members/${id}`
      );
      fetchMembers();
      notification.success({ message: "Member deleted successfully!" });
    } catch (error) {
      console.error("Error deleting member:", error);
      notification.error({ message: "Failed to delete member" });
    }
  };

  const columns = [
    { title: "ID", dataIndex: "_id", key: "_id" },
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
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className=" bg-white rounded-lg ">
      <div className="flex md:flex-row flex-col justify-between items-center mb-6">
        <Title level={2}>Library Members</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingMember(null);
            form.resetFields();
            setIsModalVisible(true);
          }}
          size="large"
        >
          Add Member
        </Button>
      </div>
      <Table
        dataSource={members}
        columns={columns}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: true }}
      />

      <Modal
        title={editingMember ? "Edit Member" : "Add Member"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleAddMember}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="subscriptionFee"
            label="Subscription Fee"
            rules={[{ required: true, type: "number" }]}
          >
            <InputNumber min={0} step={0.01} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="subscriptionDueDate"
            label="Subscription Due Date"
            rules={[{ required: true }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {editingMember ? "Update" : "Add"}
              </Button>
              <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LibraryMemberList;
