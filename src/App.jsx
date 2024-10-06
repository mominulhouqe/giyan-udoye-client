import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import "./App.css";
import Navbar from "./Components/Navber";
import Footer from "./Components/Footer";

const { Content } = Layout;

function App() {
  return (
    <Layout className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
      <Navbar />
      <Content className="container mx-auto p-4 flex-grow">
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  );
}

export default App;
