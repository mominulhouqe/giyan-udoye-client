import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Form,
  Input,
  Modal,
  message,
  Row,
  Col,
  Card,
  Typography,
} from "antd";

const { Title } = Typography;

const LibraryMemberManagement = () => {
  const [members, setMembers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get("/api/library-members");
      setMembers(response.data);
    } catch (error) {
      message.error("Failed to fetch members");
    }
  };

  const handleAddOrUpdateMember = async (values) => {
    try {
      if (currentMember) {
        // Update member
        await axios.put(`/api/library-members/${currentMember._id}`, values);
        message.success("Library member updated successfully");
      } else {
        // Add new member
        await axios.post("/api/library-members", values);
        message.success("Library member added successfully");
      }
      fetchMembers();
      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to save member");
    }
  };

  const handleDeleteMember = async (id) => {
    try {
      await axios.delete(`/api/library-members/${id}`);
      message.success("Library member deleted successfully");
      fetchMembers();
    } catch (error) {
      message.error("Failed to delete member");
    }
  };

  const handleEditClick = (member) => {
    setCurrentMember(member);
    form.setFieldsValue(member);
    setIsModalVisible(true);
  };

  const handleAddClick = () => {
    setCurrentMember(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name", responsive: ["md"] },
    { title: "Email", dataIndex: "email", key: "email", responsive: ["lg"] },
    { title: "Phone", dataIndex: "phone", key: "phone", responsive: ["xl"] },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      responsive: ["xxl"],
      render: (text) => (
        <img src={text} alt="member" style={{ width: 50, height: 50 }} />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Row gutter={[8, 8]}>
          <Col>
            <Button type="link" onClick={() => handleEditClick(record)}>
              Edit
            </Button>
          </Col>
          <Col>
            <Button
              type="link"
              danger
              onClick={() => handleDeleteMember(record._id)}
            >
              Delete
            </Button>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <Card className="border-0 m-0 p-0 shadow-none">
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Title level={2}>Library Member Management</Title>
        </Col>
        <Col>
          <Button type="primary" onClick={handleAddClick}>
            Add Library Member
          </Button>
        </Col>
      </Row>
      <Table
        dataSource={members}
        columns={columns}
        rowKey="_id"
        scroll={{ x: "max-content" }}
        responsive
      />

      <Modal
        title={currentMember ? "Edit Library Member" : "Add Library Member"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAddOrUpdateMember} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter the email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone">
            <Input />
          </Form.Item>
          <Form.Item name="image" label="Image URL">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {currentMember ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default LibraryMemberManagement;
