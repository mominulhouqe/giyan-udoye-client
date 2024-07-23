// src/components/LibraryStatistics.js
import { useEffect, useState } from "react";
import axios from "axios";

const LibraryStatistics = () => {
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          message.error("No authentication token found");
          return;
        }
        const response = await axios.get("/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (error) {
        message.error("Failed to fetch users data");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);


  // Fetch the list of books
  const fetchBooks = async () => {
    try {
      const response = await axios.get("/api/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Failed to fetch books", error);
      message.error("Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="py-12 bg-gray-100">
      <hr className="my-6"/>
      <h2 className="text-3xl text-center font-bold mb-8 underline">
        Library Statistics
      </h2>
      <div className="flex justify-around">
        <div className="text-center">
        {users.length > 0 ? (
         <h3 className="text-5xl font-bold">{users.length}</h3>
          )
         : (

            <p className="text-left text-red-400">Login First If you want to see</p>
       
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
