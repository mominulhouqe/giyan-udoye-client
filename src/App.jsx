import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navber";

function App() {
  return (
    <div className="container mx-auto bg-[#A68A64]">
      <Navbar  />

      <Outlet></Outlet>
    </div>
  );
}

export default App;
