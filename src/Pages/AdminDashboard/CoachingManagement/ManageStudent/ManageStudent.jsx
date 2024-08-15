import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Button, List, Avatar, Alert, Space, Form } from "antd";
import { UserOutlined, DeleteOutlined } from "@ant-design/icons";

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    phone: "",
    image: "",
    batchName: "",
    subjectName: "",
  });
  const [alert, setAlert] = useState({ type: "", message: "", visible: false });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          "https://giyan-udoye.vercel.app/api/v1/students"
        );
        setStudents(response.data);
      } catch (error) {
        console.error("Failed to fetch students", error);
      }
    };

    fetchStudents();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const handleAddStudent = async () => {
    try {
      await axios.post(
        "https://giyan-udoye.vercel.app/api/v1/students",
        newStudent
      );
      setNewStudent({
        name: "",
        email: "",
        phone: "",
        image: "",
        batchName: "",
        subjectName: "",
      });
      const response = await axios.get(
        "https://giyan-udoye.vercel.app/api/v1/students"
      );
      setStudents(response.data);
      setAlert({
        type: "success",
        message: "Student added successfully!",
        visible: true,
      });
    } catch (error) {
      setAlert({
        type: "error",
        message: "Failed to add student!",
        visible: true,
      });
      console.error("Failed to add student", error);
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      await axios.delete(
        `https://giyan-udoye.vercel.app/api/v1/students/${id}`
      );
      const response = await axios.get(
        "https://giyan-udoye.vercel.app/api/v1/students"
      );
      setStudents(response.data);
      setAlert({
        type: "success",
        message: "Student deleted successfully!",
        visible: true,
      });
    } catch (error) {
      setAlert({
        type: "error",
        message: "Failed to delete student!",
        visible: true,
      });
      console.error("Failed to delete student", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Manage Students</h1>

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
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 place-content-center"
      >
        <Form.Item label="Name">
          <Input
            name="name"
            value={newStudent.name}
            onChange={handleInputChange}
            placeholder="Enter student name"
            prefix={<UserOutlined />}
          />
        </Form.Item>
        <Form.Item label="Email">
          <Input
            name="email"
            value={newStudent.email}
            onChange={handleInputChange}
            placeholder="Enter student email"
            type="email"
          />
        </Form.Item>
        <Form.Item label="Phone">
          <Input
            name="phone"
            value={newStudent.phone}
            onChange={handleInputChange}
            placeholder="Enter student phone"
          />
        </Form.Item>
        <Form.Item label="Image URL">
          <Input
            name="image"
            value={newStudent.image}
            onChange={handleInputChange}
            placeholder="Enter image URL"
          />
        </Form.Item>
        <Form.Item label="Batch Name">
          <Input
            name="batchName"
            value={newStudent.batchName}
            onChange={handleInputChange}
            placeholder="Enter batch name"
          />
        </Form.Item>
        <Form.Item label="Subject Name">
          <Input
            name="subjectName"
            value={newStudent.subjectName}
            onChange={handleInputChange}
            placeholder="Enter subject name"
          />
        </Form.Item>
        <Button type="primary" onClick={handleAddStudent}>
          Add Student
        </Button>
      </Form>

      <List
        className="mt-4"
        itemLayout="horizontal"
        dataSource={students}
        renderItem={(student) => (
          <List.Item
            className="bg-gray-100  rounded-md my-2 "
            actions={[
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteStudent(student._id)}
              >
                Delete
              </Button>,
            ]}
          >
            <List.Item.Meta
              className="p-2"
              avatar={<Avatar src={student.image} />}
              title={student.name}
              description={`Email: ${student.email} | Phone: ${student.phone} | Batch: ${student.batchName} | Subject: ${student.subjectName}`}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default ManageStudents;
