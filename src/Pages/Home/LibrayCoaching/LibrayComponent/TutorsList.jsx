import { useState, useEffect } from "react";
import axios from "axios";
import TutorCard from "./TutorCard";
import { motion } from "framer-motion";
import { Typography, Spin, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Title } = Typography;

const TutorsList = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await axios.get(
          "https://giyan-udoye.vercel.app/api/v1/tutors"
        );
        setTutors(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch tutors", error);
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  const filteredTutors = tutors.filter(
    (tutor) =>
      tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className=""
    >
      <Title level={2} className="text-center font-bold mb-12">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-500">
          Meet Our Expert Coaching Tutors
        </span>
      </Title>

      <Input
        size="large"
        placeholder="Search tutors by name or subject..."
        prefix={<SearchOutlined />}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full max-w-md mx-auto mb-8 border-2 border-purple-300 rounded-full shadow-lg"
      />

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : (
        <motion.div
          className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, staggerChildren: 0.1 }}
        >
          {filteredTutors.length > 0 ? (
            filteredTutors.map((tutor) => (
              <motion.div key={tutor._id}>
                <TutorCard tutor={tutor} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center text-white text-xl">
              No tutors found. Try a different search term.
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default TutorsList;
