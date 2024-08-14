// src/components/Hero.js
import { Button } from "antd";
import { motion } from "framer-motion";

const Hero = () => (
  <div className=" text-white py-20 ">
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className=" text-center"
    >
      <h1 className="text-5xl font-bold">Welcome to GiyanUdaye Library</h1>
      <p className="mt-4 text-xl">
        Explore our extensive collection of Islamic literature
      </p>
      <Button type="primary" size="large" className="mt-6">
        Get Started
      </Button>
    </motion.div>
  </div>
);

export default Hero;
