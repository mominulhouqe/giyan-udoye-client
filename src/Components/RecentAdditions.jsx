import { useEffect, useState } from "react";
import { List, Card, Spin, message } from "antd";
import axios from "axios";
import BookCard from "./BookCard";

const RecentAdditions = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch recent additions
  const fetchRecentAdditions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/books?recent=true"
      );
      setBooks(response.data); // Update state with fetched data
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error(
        "Failed to fetch recent additions:",
        error.response ? error.response.data : error.message
      );
      setError("Failed to fetch recent additions."); // Set error message
      setLoading(false); // Set loading to false even if there is an error
    }
  };

  // Fetch recent additions on component mount
  useEffect(() => {
    fetchRecentAdditions();
  }, []);

  // Display loading spinner
  if (loading) {
    return <Spin tip="Loading recent additions..." />;
  }

  // Display error message
  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  // Display list of books
  return (
    <div className="py-12">
      <h2 className="text-3xl text-center font-bold mb-8">Recent Additions</h2>
      <div className="grid sm:grid-cols-2 gap-4 md:grid-cols-3 ">
        {books.map((book) => (
          <BookCard
            key={book._id}
            title={book.title}
            author={book.author}
            description={book.description}
            image={book.image}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentAdditions;
