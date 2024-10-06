// Login.jsx
import { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://giyan-udoye.vercel.app/api/v1/auth/login",
        values
      );
      const { token } = response.data;
      localStorage.setItem("token", token);
      notification.success({
        message: "Login Successful",
        description: "Welcome back!",
      });
      navigate("/");
    } catch (error) {
      notification.error({
        message: "Login Failed",
        description:
          error.response?.data?.message || "An error occurred during login.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-600 to-indigo-700 w-full min-h-screen flex justify-center items-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white p-8 rounded-2xl shadow-2xl"
      >
        <h1 className="text-4xl font-bold mb-6 text-center text-indigo-700">
          Welcome Back
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Enter your credentials to access your account
        </p>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Invalid email format" },
            ]}
          >
            <Input
              prefix={<FaUser className="text-indigo-500" />}
              placeholder="Enter your email"
              className="rounded-lg py-2 px-4"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              prefix={<FaLock className="text-indigo-500" />}
              placeholder="Enter your password"
              className="rounded-lg py-2 px-4"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 border-none rounded-lg h-12 text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105"
            >
              Login
            </Button>
          </Form.Item>
          <div className="text-center mt-6">
            <Link
              to="/register"
              className="text-indigo-600 hover:text-indigo-800 transition duration-300 text-lg"
            >
              New here? Register now and join our community!
            </Link>
          </div>
        </Form>
      </motion.div>
    </div>
  );
};

export default Login;
