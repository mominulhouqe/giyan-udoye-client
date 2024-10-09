import React from "react";
import { motion } from "framer-motion";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const CoachingTestimionial = () => {
  const testimonials = [
    {
      text: "The coaching was fantastic! I learned so much and feel confident in my skills.",
      name: "Jamal Miah",
      avatar: "/path/to/jamal-avatar.jpg",
    },
    {
      text: "Amazing experience! The instructors were knowledgeable and supportive.",
      name: "Piyash Khan",
      avatar: "/path/to/piyash-avatar.jpg",
    },
    {
      text: "Highly recommend! The program was well-organized and engaging.",
      name: "Tufayel Khan",
      avatar: "/path/to/tufayel-avatar.jpg",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-16 "
    >
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl font-bold mb-12 text-center text-white"
        >
          What Our Students Say
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              className="bg-white p-8 rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
            >
              <div className="flex flex-col items-center">
                <Avatar
                  size={80}
                  icon={<UserOutlined />}
                  src={testimonial.avatar}
                  className="mb-4"
                />
                <p className="text-lg mb-6 text-gray-700 italic">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <p className="font-semibold text-xl text-blue-600">
                  {testimonial.name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CoachingTestimionial;
