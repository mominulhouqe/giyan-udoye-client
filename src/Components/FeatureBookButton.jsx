import { Button, message, Spin } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const FeatureBookButton = ({ bookId, featured, onSuccess }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.log(error.message);
          return;
        }
        const response = await axios.get(" https://giyan-udoye.vercel.app/api/v1/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <Spin tip="Loading..." />;
  const toggleFeatured = async () => {
    try {
      // Toggle the feature status of the book
      const response = await axios.put(` https://giyan-udoye.vercel.app/api/v1/books/${bookId}`, {
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
