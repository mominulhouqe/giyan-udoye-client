import React, { useState } from "react";
import { Form, Input, Button, Select, message } from "antd";
import bkash from "../assets/bkash.png";
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
    <div className="container mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 text-white">
      <div>
        <h1 className="text-5xl font-bold text-center mb-6 ">
          Donate to GiyanUday Islamic Library
        </h1>
        <p className="text-center mb-8 text-lg text-gray-200">
          Your donations help us continue our mission of providing free access
          to Islamic literature and resources.
        </p>

        <div class="grid grid-cols-2 md:gap-8 gap-5 my-6">
          <div class="flex gap-3 items-center">
            <img src={bkash} alt="" className="w-14 " />

            <div>
              <h2 class="text-xl font-light">Bkash</h2>
              <p class="font-light">01708409782</p>
            </div>
          </div>
          <div class="flex gap-3 items-center">
            <span class="bg-rose-400 rounded-full md:h-12 md:w-12 w-10  fill-white flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="m-2.5"
                viewBox="0 0 448 512"
              >
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
              </svg>
            </span>
            <div>
              <h2 class="text-xl font-light">Call</h2>
              <p class="font-light">01876697546</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-lg  w-full mx-auto bg-white p-8 rounded-lg shadow-md">
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input type="email" placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Donation Amount"
            name="amount"
            rules={[
              { required: true, message: "Please enter the donation amount" },
            ]}
          >
            <Input type="number" placeholder="Enter donation amount" />
          </Form.Item>

          <Form.Item
            label="Payment Method"
            name="paymentMethod"
            rules={[
              { required: true, message: "Please select a payment method" },
            ]}
          >
            <Select placeholder="Select payment method">
              <Select.Option value="creditCard">Credit Card</Select.Option>
              <Select.Option value="paypal">PayPal</Select.Option>
              <Select.Option value="bankTransfer">Bank Transfer</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full"
            >
              Donate Now
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default DonationPage;
