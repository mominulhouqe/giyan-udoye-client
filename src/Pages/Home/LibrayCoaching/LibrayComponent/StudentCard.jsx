import React from "react";

const StudentCard = ({ student }) => {
  console.log(student);
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <img src={student.image} alt={student.name} className="w-24 h-24 rounded-full mb-2" />
      <h2 className="text-xl font-bold">{student.name}</h2>
      <p>Batch: {student.batchName}</p>
      <p>Subject: {student.subjectName}</p>
    </div>
  );
};

export default StudentCard;
