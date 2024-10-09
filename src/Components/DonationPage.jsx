import React, { useState } from "react";
import { Form, Input, Button, Select, message } from "antd";
import bkash from "../assets/bkash.png";
import { motion } from "framer-motion";

const DonationPage = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Make API call to process the donation
      // For example: await axios.post("/api/donations", values);

      message.success("Thank you for your donation!");
      setLoading(false);
    } catch (error) {
      message.error("Failed to process the donation.");
      setLoading(false);
    }
  };

  return (
    <div className=" bg-gradient-to-br from-indigo-100 to-purple-100 mb-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full mx-auto bg-white md:rounded-3xl overflow-hidden flex flex-col md:flex-row"
      >
        <div className="md:w-1/2 p-4 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
          <h1 className="text-3xl font-extrabold mb-8 text-center leading-tight">
            Support GiyanUday Islamic Library
          </h1>
          <p className="text-xl mb-10 text-center font-light">
            Your generosity fuels our mission to provide free access to Islamic
            knowledge.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 my-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center bg-white bg-opacity-20 rounded-2xl p-6 transition-all duration-300 hover:bg-opacity-30"
            >
              <img src={bkash} alt="bKash" className="w-16 h-16 mr-6" />
              <div>
                <h2 className="text-2xl font-bold">bKash</h2>
                <p className="text-lg opacity-80">01708409782</p>
              </div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center bg-white bg-opacity-20 rounded-2xl p-6 transition-all duration-300 hover:bg-opacity-30"
            >
              <span className="bg-rose-500 rounded-full h-16 w-16 flex justify-center items-center mr-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
              </span>
              <div>
                <h2 className="text-2xl font-bold">Call Us</h2>
                <p className="text-lg opacity-80">01876697546</p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="md:w-1/2 p-4 bg-white">
          <h2 className="text-4xl font-bold mb-8 text-gray-800 text-center">
            Make a Donation
          </h2>
          <Form layout="vertical" onFinish={onFinish} className="space-y-6">
            <Form.Item
              label={<span className="text-lg">Name</span>}
              name="name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input
                placeholder="Enter your name"
                className="rounded-lg text-lg py-2"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-lg">Email</span>}
              name="email"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input
                type="email"
                placeholder="Enter your email"
                className="rounded-lg text-lg py-2"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-lg">Donation Amount</span>}
              name="amount"
              rules={[
                { required: true, message: "Please enter the donation amount" },
              ]}
            >
              <Input
                type="number"
                placeholder="Enter donation amount"
                className="rounded-lg text-lg py-2"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-lg">Payment Method</span>}
              name="paymentMethod"
              rules={[
                { required: true, message: "Please select a payment method" },
              ]}
            >
              <Select
                placeholder="Select payment method"
                className="rounded-lg text-lg"
                size="large"
              >
                <Select.Option value="creditCard">Credit Card</Select.Option>
                <Select.Option value="paypal">PayPal</Select.Option>
                <Select.Option value="bankTransfer">
                  Bank Transfer
                </Select.Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white text-xl font-bold py-3 px-6 rounded-xl transition duration-300 shadow-lg hover:shadow-xl"
              >
                Donate Now
              </Button>
            </Form.Item>
          </Form>
        </div>
      </motion.div>
    </div>
  );
};

export default DonationPage;
