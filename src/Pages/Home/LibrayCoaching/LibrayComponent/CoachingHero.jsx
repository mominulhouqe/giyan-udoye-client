import { Button } from 'antd';
import React from 'react';

const CoachingHero = () => {
    return (
        <div>
               {/* Hero Section */}
      <div className="relative bg-cover bg-center py-24" style={{ backgroundImage: "url('https://example.com/hero-image.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to GianUday Coaching Center</h1>
          <p className="text-lg md:text-xl mb-8">Empowering you with the knowledge to succeed.</p>
          <Button type="primary" size="large" className="bg-blue-600 border-blue-600 hover:bg-blue-700">Get Started</Button>
        </div>
      </div>
        </div>
    );
};

export default CoachingHero;