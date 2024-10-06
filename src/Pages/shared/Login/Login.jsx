import { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

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
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full mx-auto mt-20 p-8 rounded-xl shadow-2xl bg-gradient-to-br from-purple-100 to-indigo-100"
    >
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold mb-6 text-center text-indigo-700"
      >
        Welcome Back
      </motion.h1>
      <Form onFinish={onFinish} layout="vertical">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Invalid email format" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="text-indigo-500" />}
              placeholder="Enter your email"
              className="rounded-md py-2"
            />
          </Form.Item>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-indigo-500" />}
              placeholder="Enter your password"
              className="rounded-md py-2"
            />
          </Form.Item>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 rounded-md py-2 text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105"
            >
              Login
            </Button>
          </Form.Item>
        </motion.div>
      </Form>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center mt-4"
      >
        <Link
          to="/register"
          className="text-indigo-600 hover:text-indigo-800 transition duration-300"
        >
          New here? Register now!
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Login;
