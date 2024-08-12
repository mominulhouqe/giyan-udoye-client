// src/components/LibraryStatistics.js
import { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { message } from "antd";
import axios from "axios";
import { fetchUsers } from "../redux/slices/userSlice";

const LibraryStatistics = () => {
  const dispatch = useDispatch();
  const { token, isAuthenticated } = useSelector((state) => state.auth);
  const { users, loading, error } = useSelector((state) => state.users);
  const [books, setBooks] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUsers(token));
    }
  }, [dispatch, isAuthenticated, token]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("/api/books");
        setBooks(response.data);
      } catch (error) {
        console.error("Failed to fetch books", error);
        message.error("Failed to fetch books");
      } finally {
        setLoadingBooks(false);
      }
    };

    fetchBooks();
  }, []);
  return (
    <div className="py-12 bg-gray-50 bg-opacity-50 m-3 rounded-md">
  
      <h2 className="text-3xl text-center font-bold mb-8 underline">
        Library Statistics
      </h2>
      <div className="flex justify-around">
        <div className="text-center">
          {users ? (
            loading ? (
              <p>Loading users...</p>
            ) : error ? (
              <p className="text-red-400">Failed to load users</p>
            ) : (
              <h3 className="text-5xl font-bold">{users.length}</h3>
            )
          ) : (
            <p className="text-left text-red-400">
              Login First If you want to see
            </p>
          )}
          <p>Registered Users</p>
        </div>
        <div className="text-center">
          <h3 className="text-5xl font-bold">{books.length}</h3>
          <p>Total Books</p>
        </div>
      </div>
    </div>
  );
};

export default LibraryStatistics;
