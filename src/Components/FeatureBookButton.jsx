import { Button, message, Spin } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const FeatureBookButton = ({ bookId, featured, onSuccess }) => {
  const dispatch = useDispatch();
  const { token, isAuthenticated } = useSelector((state) => state.auth);
  const { user, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUsers(token));
    }
  }, [dispatch, isAuthenticated, token]);


  const toggleFeatured = async () => {
    try {
      // Toggle the feature status of the book
      const response = await axios.put(`/api/books/${bookId}`, {
        featured: !featured,
      });

      // Call the onSuccess callback to update the UI or refetch the book list
      if (onSuccess) {
        onSuccess();
      }

      // Notify the user of the successful update
      message.success(
        `Book feature status updated to ${
          response.data.featured ? "featured" : "unfeatured"
        }`
      );
    } catch (error) {
      // Log and notify the user of the error
      console.error("Failed to update book feature status", error);
      message.error("Failed to update book feature status");
    }
  };

  if (loading) return <Spin tip="Loading..." />;
  return (
    <div>
      {user?.role === "admin" && (
        <Button type="primary" onClick={toggleFeatured}>
          {featured ? "Unfeature" : "Feature"}
        </Button>
      )}
    </div>
  );
};

export default FeatureBookButton;
