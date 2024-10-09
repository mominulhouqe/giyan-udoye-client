import { Card, Avatar, Button, Tag } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  BookOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";

const TutorCard = ({ tutor }) => {
  return (
    <motion.div>
      <Card
        className="mb-4 shadow-lg rounded-lg overflow-hidden"
        hoverable
        cover={
          <div className="relative h-48">
            <img
              alt="Tutor"
              src={tutor.image}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
            <h2 className="absolute bottom-4 left-4 text-3xl font-bold text-white">
              {tutor.name}
            </h2>
          </div>
        }
      >
        <Card.Meta
          avatar={
            <Avatar
              src={tutor.image}
              size={80}
              className="border-4 border-white shadow-md"
            />
          }
          title={
            <div className="flex items-center justify-between">
              <Tag color="blue" className="text-sm">
                {tutor.profession}
              </Tag>
              <Tag color="green" className="text-sm">
                {tutor.subject}
              </Tag>
            </div>
          }
          description={
            <div className="mt-4">
              <p className="flex items-center text-gray-700 mb-2">
                <BookOutlined className="mr-2 text-blue-500" /> {tutor.subject}
              </p>
              <p className="flex items-center text-gray-700 mb-2">
                <TrophyOutlined className="mr-2 text-yellow-500" />{" "}
                {tutor.profession}
              </p>
            </div>
          }
        />
        <div className="mt-4 flex flex-col space-y-2">
          <p className="text-sm text-gray-600 flex items-center">
            <PhoneOutlined className="mr-2 text-green-500" /> {tutor.contact}
          </p>
        </div>
        <Button
          type="primary"
          className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          Contact Tutor
        </Button>
      </Card>
    </motion.div>
  );
};

export default TutorCard;
