import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageClasses = () => {
  const [classes, setClasses] = useState([]);
  const [newClass, setNewClass] = useState({
    name: "",
    subject: "",
    instructor: "",
    duration: "",
    contactEmail: "",
    contactPhone: "",
    rating:"",
    availableSeats: 0,
  });

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/classes");
        setClasses(response.data);
      } catch (error) {
        console.error("Failed to fetch classes", error);
      }
    };

    fetchClasses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClass({ ...newClass, [name]: value });
  };

  const handleAddClass = async () => {
    try {
      await axios.post("http://localhost:5000/api/classes", newClass);
      setNewClass({
        name: "",
        subject: "",
        instructor: "",
        duration: "",
        contactEmail: "",
        contactPhone: "",
        rating: "",
        availableSeats: 0
      });
      // Refresh the list
      const response = await axios.get("http://localhost:5000/api/classes");
      setClasses(response.data);
    } catch (error) {
      console.error("Failed to add class", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Manage Classes</h1>
      <div className="mb-4">
        <input
          type="text"
          name="name"
          value={newClass.name}
          onChange={handleInputChange}
          className="border p-2 mb-2"
          placeholder="Class Name"
        />
        <input
          type="text"
          name="subject"
          value={newClass.subject}
          onChange={handleInputChange}
          className="border p-2 mb-2"
          placeholder="Subject"
        />
        <input
          type="text"
          name="instructor"
          value={newClass.instructor}
          onChange={handleInputChange}
          className="border p-2 mb-2"
          placeholder="Instructor"
        />
        <input
          type="text"
          name="duration"
          value={newClass.duration}
          onChange={handleInputChange}
          className="border p-2 mb-2"
          placeholder="Duration"
        />
        <input
          type="email"
          name="contactEmail"
          value={newClass.contactEmail}
          onChange={handleInputChange}
          className="border p-2 mb-2"
          placeholder="Contact Email"
        />
        <input
          type="text"
          name="contactPhone"
          value={newClass.contactPhone}
          onChange={handleInputChange}
          className="border p-2 mb-2"
          placeholder="Contact Phone"
        />
      
        <input
          type="number"
          name="availableSeats"
          value={newClass.availableSeats}
          onChange={handleInputChange}
          className="border p-2 mb-2"
          placeholder="Available Seats"
        />
          <input
          type="text"
          name="Rating"
          value={newClass.rating}
          onChange={handleInputChange}
          className="border p-2 mb-2"
          placeholder="Rating"
        />
        <button onClick={handleAddClass} className="bg-blue-500 text-white p-2 rounded">
          Add Class
        </button>
      </div>
      <ul className="mt-4 ">
        {classes.map((cls) => (
          <li key={cls._id} className="mb-2 bg-gray-200 p-2 rounded-md">
            <strong>{cls.name}</strong><br />
            Subject: {cls.subject}<br />
            Instructor: {cls.instructor}<br />
            Duration: {cls.duration}<br />
            Rating: {cls.rating}<br />
            Email: {cls.contactEmail}<br />
            Phone: {cls.contactPhone}<br />
            Available Seats: {cls.availableSeats}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageClasses;
