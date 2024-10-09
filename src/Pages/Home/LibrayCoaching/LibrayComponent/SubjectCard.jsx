/* eslint-disable react/prop-types */

import { Card, Tag, Rate, Button } from "antd";
import { motion } from "framer-motion";
import {
  InfoCircleOutlined,
  UserOutlined,
  ClockCircleOutlined,
  MailOutlined,
  PhoneOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const { Meta } = Card;

// eslint-disable-next-line react/prop-types
const SubjectCard = ({ subject }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="p-2"
    >
      <Card
        hoverable
        className="bg-white rounded-lg shadow-lg overflow-hidden "
        cover={
          <div className="relative">
            <img
              alt={subject.subjectName}
              src={subject.image}
              className="object-cover h-48 w-full"
            />
            <Tag
              color="blue"
              className="absolute top-2 right-2 text-sm font-semibold"
            >
              {subject.className}
            </Tag>
          </div>
        }
        actions={[
          <Button
            key="Like"
            type="primary"
            icon={<InfoCircleOutlined />}
            className="bg-blue-500 hover:bg-blue-600"
          >
            More Info
          </Button>,
        ]}
      >
        <Meta
          title={
            <h2 className="text-xl font-bold text-indigo-700">
              {subject.subjectName}
            </h2>
          }
          description={
            <div className="space-y-2">
              <p className="flex items-center text-gray-700">
                <UserOutlined className="mr-2" /> {subject.instructor}
              </p>
              <p className="flex items-center text-gray-700">
                <ClockCircleOutlined className="mr-2" /> {subject.duration}
              </p>
              <div className="flex items-center">
                <Rate
                  disabled
                  defaultValue={subject.rating}
                  className="text-yellow-500"
                />
                <span className="ml-2 text-gray-600">({subject.rating})</span>
              </div>
              <p className="flex items-center text-gray-700">
                <MailOutlined className="mr-2" /> {subject.contact?.email}
              </p>
              <p className="flex items-center text-gray-700">
                <PhoneOutlined className="mr-2" /> {subject.contact?.phone}
              </p>
              <p className="flex items-center text-green-600 font-semibold">
                <TeamOutlined className="mr-2" /> Available Seats:{" "}
                {subject.availableSeats}
              </p>
            </div>
          }
        />
      </Card>
    </motion.div>
  );
};

export default SubjectCard;
