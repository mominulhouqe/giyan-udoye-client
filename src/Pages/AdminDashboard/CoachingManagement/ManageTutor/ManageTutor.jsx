import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Button, List, Avatar, Alert, Form } from "antd";
import { UserOutlined, DeleteOutlined } from "@ant-design/icons";

const ManageTutor = () => {
  const [tutors, setTutors] = useState([]);
  const [newTutor, setNewTutor] = useState({
    name: "",
    subject: "",
    profession: "",
    contact: "",
    image: "",
  });
  const [alert, setAlert] = useState({ type: "", message: "", visible: false });

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await axios.get(
          "https://giyan-udoye.vercel.app/api/v1/tutors"
        );
        setTutors(response.data);
      } catch (error) {
        console.error("Failed to fetch tutors", error);
      }
    };

    fetchTutors();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTutor({ ...newTutor, [name]: value });
  };


  const handleAddTutor = async () => {
    const { name, subject, profession, contact, image } = newTutor;

    if (!name || !subject || !profession || !contact || !image) {
      setAlert({
        type: "error",
        message: "All fields are required.",
        visible: true,
      });
      return;
    }

    try {
      await axios.post(
        "https://giyan-udoye.vercel.app/api/v1/tutors",
        newTutor
      );
      setNewTutor({
        name: "",
        subject: "",
        profession: "",
        contact: "",
        image: "",
      });
      const response = await axios.get(
        "https://giyan-udoye.vercel.app/api/v1/tutors"
      );
      setTutors(response.data);
      setAlert({
        type: "success",
        message: "Tutor added successfully!",
        visible: true,
      });
    } catch (error) {
      setAlert({
        type: "error",
        message: "Failed to add tutor.",
        visible: true,
      });
      console.error("Failed to add tutor", error);
    }
  };

  const handleDeleteTutor = async (id) => {
    try {
      await axios.delete(`https://giyan-udoye.vercel.app/api/v1/tutors/${id}`);
      const response = await axios.get(
        "https://giyan-udoye.vercel.app/api/v1/tutors"
      );
      setTutors(response.data);
      setAlert({
        type: "success",
        message: "Tutor deleted successfully!",
        visible: true,
      });
    } catch (error) {
      setAlert({
        type: "error",
        message: "Failed to delete tutor.",
        visible: true,
      });
      console.error("Failed to delete tutor", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Manage Tutors</h1>

      {alert.visible && (
        <Alert
          message={alert.message}
          type={alert.type}
          showIcon
          closable
          onClose={() => setAlert({ ...alert, visible: false })}
          className="mb-4"
        />
      )}

      <Form
        layout="vertical"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
      >
        <Form.Item label="Name">
          <Input
            name="name"
            value={newTutor.name}
            onChange={handleInputChange}
            placeholder="Enter tutor name"
            prefix={<UserOutlined />}
          />
        </Form.Item>
        <Form.Item label="Subject">
          <Input
            name="subject"
            value={newTutor.subject}
            onChange={handleInputChange}
            placeholder="Enter subject"
          />
        </Form.Item>
        <Form.Item label="Profession">
          <Input
            name="profession"
            value={newTutor.profession}
            onChange={handleInputChange}
            placeholder="Enter profession"
          />
        </Form.Item>
        <Form.Item label="Contact">
          <Input
            name="contact"
            value={newTutor.contact}
            onChange={handleInputChange}
            placeholder="Enter contact"
          />
        </Form.Item>
        <Form.Item label="Image URL">
          <Input
            name="image"
            value={newTutor.image}
            onChange={handleInputChange}
            placeholder="Enter image URL"
          />
        </Form.Item>
        <Button type="primary" onClick={handleAddTutor}>
          Add Tutor
        </Button>
      </Form>

      <List
        className="mt-4"
        itemLayout="horizontal"
        dataSource={tutors}
        renderItem={(tutor) => (
          <List.Item
            className="bg-gray-100 rounded-md my-2"
            actions={[
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteTutor(tutor._id)}
              >
                Delete
              </Button>,
            ]}
          >
            <List.Item.Meta
              className="p-2"
              avatar={<Avatar src={tutor.image} />}
              title={tutor.name}
              description={`Subject: ${tutor.subject} | Profession: ${tutor.profession} | Contact: ${tutor?.contact}`}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default ManageTutor;
