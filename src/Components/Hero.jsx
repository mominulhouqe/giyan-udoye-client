// src/components/Hero.js
import { Button } from "antd";
import { motion } from "framer-motion";
import img from "../assets/hero.jpg";
import { FaBook, FaSearch } from "react-icons/fa";

const Hero = () => (
  <div
    className="relative bg-cover bg-center bg-no-repeat text-white py-20"
    style={{
      backgroundImage: `url('${img}')`,
      height: "calc(100vh - 15vh)",
    }}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-70"></div>
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="relative container mx-auto px-4 z-10 flex flex-col items-center justify-center h-full"
    >
      <h1 className="text-6xl font-bold mb-6 text-center leading-tight">
        Discover the Wisdom of
        <span className="block text-yellow-400">GiyanUdaye Library</span>
      </h1>
      <p className="mt-4 text-2xl text-center max-w-2xl mb-8">
        Embark on a journey through our vast collection of Islamic literature
        and enrich your knowledge
      </p>
      <div className="flex space-x-4">
        <Button
          type="primary"
          size="large"
          icon={<FaBook />}
          className="flex items-center"
        >
          Explore Books
        </Button>
        <Button
          type="default"
          size="large"
          icon={<FaSearch />}
          className="flex items-center bg-white text-black hover:bg-gray-200"
        >
          Search Catalog
        </Button>
      </div>
    </motion.div>
  </div>
);

export default Hero;
