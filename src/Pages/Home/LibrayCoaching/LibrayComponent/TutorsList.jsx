import React, { useState, useEffect } from "react";
import axios from "axios";
import TutorCard from "./TutorCard";

const TutorsList = () => {
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await axios.get("/api/tutors");
        setTutors(response.data);
      } catch (error) {
        console.error("Failed to fetch tutors", error);
      }
    };

    fetchTutors();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Coaching Tutors</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tutors.map((tutor) => (
          <TutorCard key={tutor._id} tutor={tutor} />
        ))}
      </div>
    </div>
  );
};

export default TutorsList;
