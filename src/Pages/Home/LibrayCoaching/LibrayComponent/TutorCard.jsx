import React from "react";
import { Card, Avatar, Button } from "antd";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";

const TutorCard = ({ tutor }) => {
  return (
    <Card
      className="mb-4 shadow-md"
      hoverable
      cover={<img alt="Tutor" src={tutor.image} />}
    >
      <Card.Meta
        avatar={<Avatar src={tutor.image} size={64} />}
        title={<h2 className="text-2xl font-bold">{tutor.name}</h2>}
        description={
          <>
            <p className="text-gray-600">Profession: {tutor.profession}</p>
            <p className="text-gray-600">Subjects: {tutor.subject}</p>
            <p className="text-gray-600">Contact: {tutor.contact}</p>
          </>
        }
      />
      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          <MailOutlined className="mr-2" /> {tutor.email}
          <br />
          <PhoneOutlined className="mr-2" /> {tutor.phone}
        </div>
        <Button type="primary">Contact Tutor</Button>
      </div>
    </Card>
  );
};

export default TutorCard;
