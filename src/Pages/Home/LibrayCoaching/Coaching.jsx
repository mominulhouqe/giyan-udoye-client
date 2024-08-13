import React from "react";
import CoachingHero from "./LibrayComponent/CoachingHero";
import CoachingTestimionial from "./LibrayComponent/CoachingTestimionial";
import ContactForm from "./LibrayComponent/ContactForm";
import SubjectsList from "./LibrayComponent/SubjectsList";

const Coaching = () => {
  return (
    <div>
      <CoachingHero />
<SubjectsList />
      {/* Coaching Programs */}
      {/* <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Coaching Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card
            hoverable
            cover={<img alt="program1" src="https://example.com/program1.jpg" />}
            className="shadow-lg"
          >
            <Card.Meta title="Program 1" description="Detailed description of Program 1" />
          </Card>
          <Card
            hoverable
            cover={<img alt="program2" src="https://example.com/program2.jpg" />}
            className="shadow-lg"
          >
            <Card.Meta title="Program 2" description="Detailed description of Program 2" />
          </Card>
          <Card
            hoverable
            cover={<img alt="program3" src="https://example.com/program3.jpg" />}
            className="shadow-lg"
          >
            <Card.Meta title="Program 3" description="Detailed description of Program 3" />
          </Card>
        </div>
      </div> */}

      <CoachingTestimionial />
      {/* Contact Form */}
      <ContactForm />
    </div>
  );
};

export default Coaching;
