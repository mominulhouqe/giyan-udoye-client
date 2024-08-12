import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentCard from "./StudentCard";

const StudentsList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("/api/students");
        setStudents(response.data);
      } catch (error) {
        console.error("Failed to fetch students", error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Current and Previous Students</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {students.map((student) => (
          <StudentCard key={student._id} student={student} />
        ))}
      </div>
    </div>
  );
};

export default StudentsList;
