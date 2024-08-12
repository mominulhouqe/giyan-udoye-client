import React from "react";

const SubjectCard = ({ subject }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-xl font-bold">{subject.className}</h2>
      <p className="text-lg">Subject: {subject.subject}</p>
      <p>Instructor: {subject.instructor}</p>
      <p>Duration: {subject.duration}</p>
      <p>Rating: {subject.rating}</p>
      <p>Contact: {subject.contact}</p>
      <p>Available Seats: {subject.availableSeats}</p>
    </div>
  );
};

export default SubjectCard;
