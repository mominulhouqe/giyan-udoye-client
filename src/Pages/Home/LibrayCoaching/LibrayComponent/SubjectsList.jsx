import React, { useState, useEffect } from "react";
import axios from "axios";
import SubjectCard from "./SubjectCard";


const SubjectsList = () => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get("/api/subjects");
        setSubjects(response.data);
      } catch (error) {
        console.error("Failed to fetch subjects", error);
      }
    };

    fetchSubjects();
  }, []);
  
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-4xl text-center text-white font-bold mb-4">Coaching Subjects</h2>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject) => (
          <SubjectCard key={subject._id} subject={subject} />
        ))}
      </div>
    </div>
  );
};

export default SubjectsList;
