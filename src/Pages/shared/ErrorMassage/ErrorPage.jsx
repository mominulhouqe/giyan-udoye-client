import React from 'react';
import { motion } from 'framer-motion';
import { Button } from 'antd'; // If you're using Ant Design
import { Link, Navigate, useNavigate } from 'react-router-dom'; // For navigation

const ErrorPage = () => {
  const navigate = useNavigate();

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, type: "spring", stiffness: 100 },
    },
    exit: {
      opacity: 0,
      y: 50,
      transition: { duration: 0.5 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { delay: 0.3, duration: 0.5 } },
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 to-purple-700 text-white"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
    >
      <motion.h1
        className="text-6xl font-bold mb-4"
        variants={textVariants}
      >
        Oops!
      </motion.h1>
      <motion.p
        className="text-2xl text-center mb-6"
        variants={textVariants}
      >
        Something went wrong. We can't find the page you're looking for.
      </motion.p>
      <motion.div
        className="mt-6"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
       <Link to="/">
       <Button
          type="primary"
          size="large"
        
        >
          Go Back Home
        </Button>
       </Link>
      </motion.div>
    </motion.div>
  );
};

export default ErrorPage;
