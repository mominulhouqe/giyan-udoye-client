// src/components/Hero.js
import { Button } from "antd";
import { motion } from "framer-motion";
import img from "../assets/hero.jpg";
import { FaBook, FaSearch } from "react-icons/fa";

const Hero = () => (
  <div
    className="relative bg-cover bg-center bg-no-repeat text-white min-h-screen flex items-center"
    style={{
      backgroundImage: `url('${img}')`,
    }}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-70"></div>
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="relative container mx-auto px-4 z-10 flex flex-col items-center justify-center"
    >
      <motion.h1
        className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-center leading-tight"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Discover the Wisdom of
        <motion.span
          className="block text-yellow-400 mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          GiyanUdaye Library
        </motion.span>
      </motion.h1>
      <motion.p
        className="mt-4 text-lg md:text-2xl text-center max-w-2xl mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        Embark on a journey through our vast collection of Islamic literature
        and enrich your knowledge
      </motion.p>
      <motion.div
        className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        <Button
          type="primary"
          size="large"
          icon={<FaBook />}
          className="flex items-center justify-center px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-full transition duration-300 ease-in-out transform hover:scale-105"
        >
          Explore Books
        </Button>
        <Button
          type="default"
          size="large"
          icon={<FaSearch />}
          className="flex items-center justify-center px-8 py-3 bg-white text-black hover:bg-gray-200 font-semibold rounded-full transition duration-300 ease-in-out transform hover:scale-105"
        >
          Search Catalog
        </Button>
      </motion.div>
    </motion.div>
  </div>
);

export default Hero;
