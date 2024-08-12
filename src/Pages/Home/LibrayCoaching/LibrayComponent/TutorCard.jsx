import React from "react";

const TutorCard = ({ tutor }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-xl font-bold">{tutor.name}</h2>
      <p>Profession: {tutor.profession}</p>
      <p>Subjects: {tutor.subjects.join(", ")}</p>
    </div>
  );
};

export default TutorCard;
