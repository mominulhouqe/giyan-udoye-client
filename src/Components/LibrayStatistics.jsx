// src/components/LibraryStatistics.js
import { useEffect, useState } from "react";
import axios from "axios";

const LibraryStatistics = () => {
  const [stats, setStats] = useState({ users: 0, books: 0 });

  useEffect(() => {
    axios.get("/api/stats").then((res) => setStats(res.data));
  }, []);

  return (
    <div className="py-12 bg-blue-50">
      <h2 className="text-3xl text-center font-bold mb-8">
        Library Statistics
      </h2>
      <div className="flex justify-around">
        <div className="text-center">
          <h3 className="text-5xl font-bold">{stats.users}</h3>
          <p>Registered Users</p>
        </div>
        <div className="text-center">
          <h3 className="text-5xl font-bold">{stats.books}</h3>
          <p>Total Books</p>
        </div>
      </div>
    </div>
  );
};

export default LibraryStatistics;
