import React from 'react';
import { Card } from 'antd';
import { motion } from 'framer-motion';
import { InfoCircleOutlined } from '@ant-design/icons';

const { Meta } = Card;

const SubjectCard = ({ subject }) => {
  console.log(
    subject
  );
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="p-4"
    >
      <Card
        className="bg-white rounded-lg shadow-md"
        cover={
          <img
            alt="example"
            src={subject.image}
            className="object-cover h-40 w-full rounded-t-lg"
          />
        }
        actions={[
          <InfoCircleOutlined key="info" />,
        ]}
      >
        <Meta
          description={
            <>
            <div className='text-black'>
              <p className="text-lg font-semibold ">Subject: {subject.subjectName
              }</p>
            <p>Instructor: {subject.instructor}</p>
              <p>ClassName: {subject.className}</p>
              <p>Duration: {subject.duration}</p>
              <p>Rating: {subject.rating}</p>
              <p>Contact Email: {subject.contact?.email}</p>
              <p>Contact Phone: {subject.contact?.phone}</p>
              <p>Available Seats: {subject.availableSeats}</p>
            </div>
            </>
          }
        />
      </Card>
    </motion.div>
  );
};

export default SubjectCard;
