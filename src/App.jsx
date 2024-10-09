import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import "./App.css";
import Navbar from "./Components/Navber";
import Footer from "./Components/Footer";

const { Content } = Layout;

function App() {
  return (
    <div className="bg-gradient-to-r from-indigo-100 to-purple-100">
      <Navbar />
      <Content className=" ">
        <Outlet />
      </Content>
      <Footer />
    </div>
  );
}

export default App;
