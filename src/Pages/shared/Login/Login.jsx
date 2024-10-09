// Login.jsx
import { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaLock } from "react-icons/fa";
import loginImage from "../../../assets/imag1.png";

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
    <div className="bg-gradient-to-br from-purple-600 to-indigo-700 w-full min-h-screen flex justify-center items-center p-4 overflow-hidden">
      <motion.img
        src={loginImage}
        alt="Decorative"
        className="absolute w-full h-full object-cover opacity-50"
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 1.5 }}
      />
      <motion.div
        initial={{ opacity: 0, y: -50, rotateX: 90 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-md w-full bg-white bg-opacity-90 p-8 rounded-2xl shadow-2xl z-10"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl font-bold mb-6 text-center text-indigo-700"
        >
          Welcome Back
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center text-gray-600 mb-8"
        >
          Enter your credentials to access your account
        </motion.p>
        <Form onFinish={onFinish} layout="vertical">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
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
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password
                prefix={<FaLock className="text-indigo-500" />}
                placeholder="Enter your password"
                className="rounded-lg py-2 px-4"
              />
            </Form.Item>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
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
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="text-center mt-6"
          >
            <Link
              to="/register"
              className="text-indigo-600 hover:text-indigo-800 transition duration-300 text-lg"
            >
              New here? Register now and join our community!
            </Link>
          </motion.div>
        </Form>
      </motion.div>
    </div>
  );
};

export default Login;
