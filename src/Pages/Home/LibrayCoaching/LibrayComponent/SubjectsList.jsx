import React, { useState, useEffect } from "react";
import axios from "axios";
import SubjectCard from "./SubjectCard";

const SubjectsList = () => {
  const [subjects, setSubjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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

  // Filter subjects based on the search query
  const filteredSubjects = subjects.filter((subject) =>
    subject.subjectName.toLowerCase().includes(searchQuery.toLowerCase())||
  subject.className.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-4xl text-center text-white font-bold my-8 underline">Coaching Subjects</h2>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search subject name and class name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 rounded border border-gray-300"
        />
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {filteredSubjects.length > 0 ? (
          filteredSubjects.map((subject) => (
            <SubjectCard key={subject._id} subject={subject} />
          ))
        ) : (
          <p className="text-center text-white">No subjects found</p>
        )}
      </div>
    </div>
  );
};

export default SubjectsList;
