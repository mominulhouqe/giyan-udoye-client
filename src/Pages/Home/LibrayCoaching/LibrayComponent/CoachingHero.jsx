import { Button } from "antd";
import { motion } from "framer-motion";
import image from "../../../../assets/coaching.jpg";

const CoachingHero = () => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url('${image}')`,
          filter: "brightness(0.7) saturate(1.2)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-indigo-900 opacity-70 z-10" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-20 text-center text-white px-4"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight"
        >
          Welcome to{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
            GiyanUdaye
          </span>
          <br />
          Coaching Center
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto"
        >
          Empowering you with the knowledge to succeed in a world of endless
          possibilities.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Button
            type="primary"
            size="large"
            className="bg-gradient-to-r from-yellow-400 to-orange-500 border-0 text-gray-900 font-bold py-3 px-8 rounded-full text-lg hover:from-yellow-500 hover:to-orange-600 transition duration-300 transform hover:scale-105"
          >
            Start Your Journey
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CoachingHero;
