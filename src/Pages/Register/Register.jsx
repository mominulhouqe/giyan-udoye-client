import { useState } from "react";
import { Form, Input, Button, notification, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const IMG_URL = "https://api.imgbb.com/1/upload";
const IMG_API_KEY = import.meta.env.VITE_IMG_API_KEY;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(""); // State for storing the image URL
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Include imageUrl in the registration values
      const data = { ...values, profileImage: imageUrl };
      await axios.post("/api/auth/register", data);
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
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Register</h1>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input placeholder="Enter your name" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Invalid email format" },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: "Please enter your password" },
            { min: 6, message: "Password must be at least 6 characters" },
          ]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>
        <Form.Item label="Profile Image">
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="block w-full text-sm text-gray-500"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-full"
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
