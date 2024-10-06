import { useState } from "react";
import { Form, Input, Button, notification, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const IMG_URL = "https://api.imgbb.com/1/upload";
const IMG_API_KEY = import.meta.env.VITE_IMG_API_KEY;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const data = { ...values, profileImage: imageUrl };
      await axios.post(
        "https://giyan-udoye.vercel.app/api/v1/auth/register",
        data
      );
      notification.success({
        message: "Registration Successful",
        description: "You can now log in with your new account.",
      });
      navigate("/login");
    } catch (error) {
      notification.error({
        message: "Registration Failed",
        description:
          error.response?.data?.message ||
          "An error occurred during registration.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImage = async (e) => {
    const image = e.target.files[0];
    if (image) {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("image", image);
        formData.append("key", IMG_API_KEY);

        const response = await axios.post(IMG_URL, formData);
        if (response.data && response.data.data && response.data.data.url) {
          setImageUrl(response.data.data.url);
        } else {
          throw new Error("Failed to get image URL.");
        }
      } catch (error) {
        console.log(error);
        message.error("Failed to upload image.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg w-full mx-auto mt-4 border rounded-lg p-6 shadow-lg bg-gradient-to-br from-purple-100 to-indigo-100"
    >
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold mb-6 text-center text-indigo-700"
      >
        Join Our Community
      </motion.h1>
      <Form onFinish={onFinish} layout="vertical">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Enter your name" className="rounded-md" />
          </Form.Item>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Invalid email format" },
            ]}
          >
            <Input placeholder="Enter your email" className="rounded-md" />
          </Form.Item>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Please enter your password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password
              placeholder="Enter your password"
              className="rounded-md"
            />
          </Form.Item>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Form.Item label="Profile Image">
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
          </Form.Item>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 rounded-md h-10 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Register
            </Button>
          </Form.Item>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <Link
            to="/login"
            className="text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
          >
            Already have an account? Log in
          </Link>
        </motion.div>
      </Form>
    </motion.div>
  );
};

export default Register;
