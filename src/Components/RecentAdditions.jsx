import { useEffect, useState } from 'react';
import { List, Card, Spin, message } from 'antd';
import axios from 'axios';

const RecentAdditions = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch recent additions
  const fetchRecentAdditions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books?recent=true');
      console.log(response);
      setBooks(response.data); // Update state with fetched data
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error('Failed to fetch recent additions:', error.response ? error.response.data : error.message);
      setError('Failed to fetch recent additions.'); // Set error message
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
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={books}
        renderItem={book => (
          <List.Item key={book.id}> {/* Assuming each book has a unique 'id' */}
            <Card title={book.title}>
              <p>{book.author}</p>
              <p>{book.description}</p>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default RecentAdditions;
