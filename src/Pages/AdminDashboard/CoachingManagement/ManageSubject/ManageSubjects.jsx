import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState({
    className: "",
    subjectName: "",
    instructor: "",
    duration: "",
    rating: "",
    contact: {
      email: "",
      phone: ""
    },
    availableSeats: ""
  });

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/subjects");
        setSubjects(response.data);
      } catch (error) {
        console.error("Failed to fetch subjects", error);
      }
    };

    fetchSubjects();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSubject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setNewSubject(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [name]: value
      }
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
        rating: "",
        contact: {
          email: "",
          phone: ""
        },
        availableSeats: ""
      });
      // Refresh the list
      const response = await axios.get("http://localhost:5000/api/subjects");
      setSubjects(response.data);
    } catch (error) {
      console.error("Failed to add subject", error);
    }
  };

  const handleDeleteSubject = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/subjects/${id}`);
      // Refresh the list
      const response = await axios.get("http://localhost:5000/api/subjects");
      setSubjects(response.data);
    } catch (error) {
      console.error("Failed to delete subject", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Manage Subjects</h1>
      <div className="mb-4">
        <input
          type="text"
          name="className"
          value={newSubject.className}
          onChange={handleInputChange}
          className="border p-2 mb-2 w-full"
          placeholder="Class Name"
        />
        <input
          type="text"
          name="subjectName"
          value={newSubject.subjectName}
          onChange={handleInputChange}
          className="border p-2 mb-2 w-full"
          placeholder="Subject Name"
        />
        <input
          type="text"
          name="instructor"
          value={newSubject.instructor}
          onChange={handleInputChange}
          className="border p-2 mb-2 w-full"
          placeholder="Instructor"
        />
        <input
          type="text"
          name="duration"
          value={newSubject.duration}
          onChange={handleInputChange}
          className="border p-2 mb-2 w-full"
          placeholder="Duration"
        />
        <input
          type="number"
          name="rating"
          value={newSubject.rating}
          onChange={handleInputChange}
          className="border p-2 mb-2 w-full"
          placeholder="Rating"
        />
        <input
          type="email"
          name="email"
          value={newSubject.contact.email}
          onChange={handleContactChange}
          className="border p-2 mb-2 w-full"
          placeholder="Contact Email"
        />
        <input
          type="text"
          name="phone"
          value={newSubject.contact.phone}
          onChange={handleContactChange}
          className="border p-2 mb-2 w-full"
          placeholder="Contact Phone"
        />
        <input
          type="number"
          name="availableSeats"
          value={newSubject.availableSeats}
          onChange={handleInputChange}
          className="border p-2 mb-2 w-full"
          placeholder="Available Seats"
        />
        <button onClick={handleAddSubject} className="bg-blue-500 text-white p-2 rounded">
          Add Subject
        </button>
      </div>
      <ul className="mt-4">
        {subjects.map((subject) => (
          <li key={subject._id} className="mb-2 flex items-center bg-gray-200 p-2 rounded-md ">
            <div className="flex-1">
              <strong>{subject.className} - {subject.subjectName}</strong><br />
              Instructor: {subject.instructor}<br />
              Duration: {subject.duration}<br />
              Rating: {subject.rating}<br />
              Contact Email: {subject.contact.email}<br />
              Contact Phone: {subject.contact.phone}<br />
              Available Seats: {subject.availableSeats}
            </div>
            <button
              onClick={() => handleDeleteSubject(subject._id)}
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

export default ManageSubjects;
