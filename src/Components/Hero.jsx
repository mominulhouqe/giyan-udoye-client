// src/components/Hero.js
import { Button } from "antd";
import { motion } from "framer-motion";
import img from "../assets/hero.jpg"
const Hero = () => (
  <div
    className="relative bg-cover bg-center bg-no-repeat text-white py-20"
    style={{
      backgroundImage: `url('${img}')`,
      height: "calc(100vh - 30vh)",
    }}
  >
    <div className="absolute inset-0 bg-black bg-opacity-50"></div> {/* Optional overlay for better text visibility */}
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="relative text-center z-10"
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
