import React from "react";
import CoachingHero from "./LibrayComponent/CoachingHero";
import CoachingTestimionial from "./LibrayComponent/CoachingTestimionial";
import ContactForm from "./LibrayComponent/ContactForm";
import SubjectsList from "./LibrayComponent/SubjectsList";
import TutorsList from "./LibrayComponent/TutorsList";

const Coaching = () => {
  return (
    <div>
      <CoachingHero />
      <SubjectsList />

      <TutorsList />

      <CoachingTestimionial />
      {/* Contact Form */}
      <ContactForm />
    </div>
  );
};

export default Coaching;
