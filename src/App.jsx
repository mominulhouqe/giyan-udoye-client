import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import "./App.css";
import Navbar from "./Components/Navber";
import Footer from "./Components/Footer";

const { Content } = Layout;

function App() {
  return (
    <div className="">
      <Navbar />
      <Content className="container mx-auto p-4 flex-grow">
        <Outlet />
      </Content>
      <Footer />
    </div>
  );
}

export default App;
