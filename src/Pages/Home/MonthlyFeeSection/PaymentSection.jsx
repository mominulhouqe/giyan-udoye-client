import React, { useState } from "react";
import axios from "axios";

const PaymentSection = () => {
  const [method, setMethod] = useState("bKash");
  const [transactionId, setTransactionId] = useState("");

  const handlePayment = async () => {
    try {
      const response = await axios.post(
        "https://giyan-udoye.vercel.app/api/v1/paymentss",
        {
          method,
          transactionId,
        }
      );
      if (response.data.success) {
        alert("Payment successful!");
      }
    } catch (error) {
      console.error(error);
      alert("Payment failed!");
    }
  };

  return (
    <div className="max-w-md mx-auto w-full p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center">
        Monthly Fee Payment
      </h2>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Payment Method
        </label>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="bKash">bKash</option>
          <option value="Nagad">Nagad</option>
        </select>
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Transaction ID
        </label>
        <input
          type="text"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter Transaction ID"
        />
      </div>
      <button
        onClick={handlePayment}
        className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
      >
        Pay Now
      </button>
    </div>
  );
};

export default PaymentSection;
