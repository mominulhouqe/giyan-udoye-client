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
    <div className="container mx-auto p-6">
      <h2 className="text-4xl font-bold text-center mb-8 text-white underline" >Coaching Tutors</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tutors.length > 0 ? (
          tutors.map((tutor) => (
            <TutorCard key={tutor._id} tutor={tutor} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-600">
            No tutors available at the moment.
          </div>
        )}
      </div>

    </div>
  );
};

export default TutorsList;
