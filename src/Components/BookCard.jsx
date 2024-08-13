import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";

const BookCard = ({ title, author, description, image, id }) => {
  // Function to truncate the description to 20 characters
  const truncateDescription = (text, charLimit) => {
    if (text.length > charLimit) {
      return text.slice(0, charLimit) + "...";
    }
    return text;
  };

  return (
    <div>
      <Link to={`/book-details/${id}`}>
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
                  <Link to={`/book-details/${id}`} className="text-blue-500 ml-2 underline">
                    Read more
                  </Link>
                </p>
              </div>
            }
            className="mt-2"
          />
        </Card>
      </Link>
    </div>
  );
};

export default BookCard;
