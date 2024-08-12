import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    phone: "",
    image: "",
    batchName: "",
    subjectName: ""
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/students");
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
      await axios.post("http://localhost:5000/api/students", newStudent);
      setNewStudent({
        name: "",
        email: "",
        phone: "",
        image: "",
        batchName: "",
        subjectName: ""
      });
      // Refresh the list
      const response = await axios.get("http://localhost:5000/api/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Failed to add student", error);
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      // Refresh the list
      const response = await axios.get("http://localhost:5000/api/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Failed to delete student", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Manage Students</h1>
      <div className="mb-4">
        <input
          type="text"
          name="name"
          value={newStudent.name}
          onChange={handleInputChange}
          className="border p-2 mb-2 w-full"
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={newStudent.email}
          onChange={handleInputChange}
          className="border p-2 mb-2 w-full"
          placeholder="Email"
        />
        <input
          type="text"
          name="phone"
          value={newStudent.phone}
          onChange={handleInputChange}
          className="border p-2 mb-2 w-full"
          placeholder="Phone"
        />
        <input
          type="text"
          name="image"
          value={newStudent.image}
          onChange={handleInputChange}
          className="border p-2 mb-2 w-full"
          placeholder="Image URL"
        />
        <input
          type="text"
          name="batchName"
          value={newStudent.batchName}
          onChange={handleInputChange}
          className="border p-2 mb-2 w-full"
          placeholder="Batch Name"
        />
        <input
          type="text"
          name="subjectName"
          value={newStudent.subjectName}
          onChange={handleInputChange}
          className="border p-2 mb-2 w-full"
          placeholder="Subject Name"
        />
        <button onClick={handleAddStudent} className="bg-blue-500 text-white p-2 rounded">
          Add Student
        </button>
      </div>
      <ul className="mt-4">
        {students.map((student) => (
          <li key={student._id} className="mb-2 flex items-center">
            <div className="flex-1">
              <strong>{student.name}</strong><br />
              Email: {student.email}<br />
              Phone: {student.phone}<br />
              Image: <img src={student.image} alt={student.name} className="w-20 h-20 object-cover"/><br />
              Batch: {student.batchName}<br />
              Subject: {student.subjectName}
            </div>
            <button
              onClick={() => handleDeleteStudent(student._id)}
              className="bg-red-500 text-white p-2 ml-4 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageStudents;
