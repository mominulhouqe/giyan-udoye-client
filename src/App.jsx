import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navber";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="container mx-auto bg-[#A68A64]">
      <Navbar  />

      <Outlet></Outlet>
      <Footer />
    </div>
  );
}

export default App;
