import { useState } from "react";
import { Form, Input, Button, notification, message, Upload } from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import registerImg from "../../../assets/imag1.png";
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

  const handleImage = async (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      setLoading(false);
      setImageUrl(info.file.response.data.url);
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      setLoading(false);
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const uploadButton = (
    <div>
      <UploadOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-purple-600 to-indigo-700 w-full min-h-screen flex justify-center items-center p-4 overflow-hidden">
      <motion.img
        src={registerImg}
        alt="Decorative"
        className="absolute w-full h-full object-cover opacity-50"
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 1.5 }}
      />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-md w-full mx-auto bg-white bg-opacity-90 rounded-xl shadow-2xl overflow-hidden z-10"
      >
        <div className="px-8 pt-8 pb-6">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl font-extrabold mb-6 text-center text-indigo-700"
          >
            Join Our Community
          </motion.h1>
          <Form onFinish={onFinish} layout="vertical">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Form.Item
                name="name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Name"
                  className="rounded-lg h-12"
                />
              </Form.Item>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
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
                  prefix={<MailOutlined />}
                  placeholder="Email"
                  className="rounded-lg h-12"
                />
              </Form.Item>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please enter your password" },
                  { min: 6, message: "Password must be at least 6 characters" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                  className="rounded-lg h-12"
                />
              </Form.Item>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Form.Item label="Profile Image">
                <Upload
                  name="image"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action={IMG_URL}
                  data={{ key: IMG_API_KEY }}
                  onChange={handleImage}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Form.Item>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 rounded-lg h-12 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Register
                </Button>
              </Form.Item>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
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
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
