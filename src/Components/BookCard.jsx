import React from "react";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const BookCard = ({ title, author, description, image, id }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // Function to truncate the description to 20 characters
  const truncateDescription = (text, charLimit) => {
    if (text.length > charLimit) {
      return text.slice(0, charLimit) + "...";
    }
    return text;
  };

  const handleSeeDetails = (e) => {
    e.stopPropagation();
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/book-details/${id}`);
    }
  };

  return (
    <div>
      <Card
        hoverable
        cover={
          <img
            alt={title}
            src={image}
            className="w-full h-48 object-cover rounded-t-md"
          />
        }
        className="bg-gray-100 shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105"
        onClick={handleSeeDetails} // Navigate on card click
      >
        <Card.Meta
          title={
            <h3 className="text-2xl font-semibold text-blue-500">{title}</h3>
          }
          description={
            <div className="text-gray-600">
              <p>
                <strong>Author:</strong> {author}
              </p>
              <p>
                {truncateDescription(description, 20)}
                <span
                  onClick={handleSeeDetails} // Navigate on "Read more" click
                  className="text-blue-500 ml-2 underline cursor-pointer"
                >
                  Read more
                </span>
              </p>
            </div>
          }
          className="mt-2"
        />
      </Card>
    </div>
  );
};

export default BookCard;
