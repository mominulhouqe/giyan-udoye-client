import { useState, useEffect } from "react";
import axios from "axios";
import SubjectCard from "./SubjectCard";
import { motion } from "framer-motion";
import { Input, Typography, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Title } = Typography;

const SubjectsList = () => {
  const [subjects, setSubjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(
          "https://giyan-udoye.vercel.app/api/v1/subjects"
        );
        setSubjects(response.data);
      } catch (error) {
        console.error("Failed to fetch subjects", error);
      }
    };

    fetchSubjects();
  }, []);

  const filteredSubjects = subjects.filter(
    (subject) =>
      subject.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.className.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className=""
    >
      <Title level={2} className="text-center font-bold my-12">
        <span className="bg-clip-text  text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
          Explore Our Coaching Subjects
        </span>
      </Title>

      <Space direction="vertical" size="large" className="w-full mt-4">
        <Input
          size="large"
          placeholder="Search subjects or classes..."
          prefix={<SearchOutlined />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md mx-auto border rounded-full shadow-lg"
        />

        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, staggerChildren: 0.1 }}
        >
          {filteredSubjects.length > 0 ? (
            filteredSubjects.map((subject) => (
              <motion.div key={subject._id}>
                <SubjectCard subject={subject} />
              </motion.div>
            ))
          ) : (
            <p className="text-center col-span-full text-lg">
              No subjects found. Try a different search term.
            </p>
          )}
        </motion.div>
      </Space>
    </motion.div>
  );
};

export default SubjectsList;
