import React from "react";
import CoachingHero from "./LibrayComponent/CoachingHero";
import CoachingTestimionial from "./LibrayComponent/CoachingTestimionial";
import ContactForm from "./LibrayComponent/ContactForm";
import SubjectsList from "./LibrayComponent/SubjectsList";
import TutorsList from "./LibrayComponent/TutorsList";

const Coaching = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-700 to-cyan-800">
      <div className="container mx-auto ">
        <CoachingHero />
        <div className="mt-6  rounded-lg p-4">
          <SubjectsList />
        </div>
        <div className="mt-6  rounded-lg p-4">
          <TutorsList />
        </div>
        <div className="mt-6  rounded-lg p-4">
          <CoachingTestimionial />
        </div>
        <div className="mt-6  rounded-lg p-4">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Coaching;
