import { Button, message } from "antd";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const FeatureBookButton = ({ bookId, featured, onSuccess }) => {
  const toggleFeatured = async () => {
    try {
      // Toggle the feature status of the book
      await axios.put(`/api/books/${bookId}`, { featured: !featured });

      // Call the onSuccess callback to update the UI or refetch the book list
      if (onSuccess) {
        onSuccess();
      }

      // Notify the user of the successful update
      message.success("Book feature status updated");
    } catch (error) {
      // Log and notify the user of the error
      console.error("Failed to update book feature status", error);
      message.error("Failed to update book feature status");
    }
  };

  return (
    <Button type="primary" onClick={toggleFeatured}>
      {featured ? "Unfeature" : "Feature"}
    </Button>
  );
};

export default FeatureBookButton;
