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
      <Content className="container mx-auto px-4 py-8 flex-grow">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Outlet />
        </div>
      </Content>
      <Footer />
    </Layout>
  );
}

export default App;
