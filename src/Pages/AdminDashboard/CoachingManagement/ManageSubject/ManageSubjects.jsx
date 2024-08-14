import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Button, List, Alert, Form, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const ManageSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState({
    className: "",
    subjectName: "",
    image: "",
    instructor: "",
    duration: "",
    rating: "",
    contact: {
      email: "",
      phone: "",
    },
    availableSeats: "",
  });
  const [alert, setAlert] = useState({ type: "", message: "", visible: false });

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/subjects");
        setSubjects(response.data);
      } catch (error) {
        setAlert({
          type: "error",
          message: "Failed to fetch subjects!",
          visible: true,
        });
        console.error("Failed to fetch subjects", error);
      }
    };

    fetchSubjects();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSubject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setNewSubject((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        [name]: value,
      },
    }));
  };

  const handleAddSubject = async () => {
    try {
      await axios.post("http://localhost:5000/api/subjects", newSubject);
      setNewSubject({
        className: "",
        subjectName: "",
        instructor: "",
        duration: "",
        image: "",
        rating: "",
        contact: {
          email: "",
          phone: "",
        },
        availableSeats: "",
      });
      const response = await axios.get("http://localhost:5000/api/subjects");
      setSubjects(response.data);
      setAlert({
        type: "success",
        message: "Subject added successfully!",
        visible: true,
      });
    } catch (error) {
      setAlert({
        type: "error",
        message: "Failed to add subject!",
        visible: true,
      });
      console.error("Failed to add subject", error);
    }
  };

  const handleDeleteSubject = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/subjects/${id}`);
      const response = await axios.get("http://localhost:5000/api/subjects");
      setSubjects(response.data);
      setAlert({
        type: "success",
        message: "Subject deleted successfully!",
        visible: true,
      });
    } catch (error) {
      setAlert({
        type: "error",
        message: "Failed to delete subject!",
        visible: true,
      });
      console.error("Failed to delete subject", error);
    }
  };

  return (
    <div className="container mx-auto p-2">
      <h1 className="text-3xl font-bold mb-4">Manage Subjects</h1>

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
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2"
      >
        <Form.Item label="Class Name">
          <Input
            name="className"
            value={newSubject.className}
            onChange={handleInputChange}
            placeholder="Enter class name"
          />
        </Form.Item>
        <Form.Item label="Image URL">
          <Input
            name="image"
            value={newSubject.image}
            onChange={handleInputChange}
            placeholder="Enter image URL"
          />
        </Form.Item>
        <Form.Item label="Subject Name">
          <Input
            name="subjectName"
            value={newSubject.subjectName}
            onChange={handleInputChange}
            placeholder="Enter subject name"
          />
        </Form.Item>
        <Form.Item label="Instructor">
          <Input
            name="instructor"
            value={newSubject.instructor}
            onChange={handleInputChange}
            placeholder="Enter instructor name"
          />
        </Form.Item>
        <Form.Item label="Duration">
          <Input
            name="duration"
            value={newSubject.duration}
            onChange={handleInputChange}
            placeholder="Enter duration"
          />
        </Form.Item>
        <Form.Item label="Rating">
          <Input
            name="rating"
            value={newSubject.rating}
            onChange={handleInputChange}
            placeholder="Enter rating"
            type="number"
          />
        </Form.Item>
        <Form.Item label="Contact Email">
          <Input
            name="email"
            value={newSubject.contact.email}
            onChange={handleContactChange}
            placeholder="Enter contact email"
            type="email"
          />
        </Form.Item>
        <Form.Item label="Contact Phone">
          <Input
            name="phone"
            value={newSubject.contact.phone}
            onChange={handleContactChange}
            placeholder="Enter contact phone"
          />
        </Form.Item>
        <Form.Item label="Available Seats">
          <Input
            name="availableSeats"
            value={newSubject.availableSeats}
            onChange={handleInputChange}
            placeholder="Enter available seats"
            type="number"
          />
        </Form.Item>
        <Button type="primary" onClick={handleAddSubject}>
          Add Subject
        </Button>
      </Form>

      <List
        className="mt-4 "
        itemLayout="horizontal"
        dataSource={subjects}
        renderItem={(subject) => (
          <List.Item
            className="bg-gray-100  rounded-md my-2"
            actions={[
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteSubject(subject._id)}
              >
                Delete
              </Button>,
            ]}
          >
            <List.Item.Meta
              className="p-2"
              title={`${subject.className} - ${subject.subjectName}`}
              description={
                <Space direction="vertical" className="">
                  <img src={subject.image} alt="" className="w-24" />
                  <span>Instructor: {subject.instructor}</span>
                  <span>Duration: {subject.duration}</span>
                  <span>Rating: {subject.rating}</span>
                  <span>Contact Email: {subject.contact.email}</span>
                  <span>Contact Phone: {subject.contact.phone}</span>
                  <span>Available Seats: {subject.availableSeats}</span>
                </Space>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default ManageSubjects;
