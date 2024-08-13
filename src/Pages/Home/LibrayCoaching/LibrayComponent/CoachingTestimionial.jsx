import React from 'react';

const CoachingTestimionial = () => {
    return (
        <div>
               {/* Testimonials */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">What Our Students Say</h2>
          <div className="flex flex-wrap gap-8 justify-center">
            <div className="bg-white p-6 shadow-lg rounded-lg max-w-sm text-center">
              <p className="text-lg mb-4">"The coaching was fantastic! I learned so much and feel confident in my skills."</p>
              <p className="font-semibold">Student 1</p>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-lg max-w-sm text-center">
              <p className="text-lg mb-4">"Amazing experience! The instructors were knowledgeable and supportive."</p>
              <p className="font-semibold">Student 2</p>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-lg max-w-sm text-center">
              <p className="text-lg mb-4">"Highly recommend! The program was well-organized and engaging."</p>
              <p className="font-semibold">Student 3</p>
            </div>
          </div>
        </div>
      </div>
        </div>
    );
};

export default CoachingTestimionial;