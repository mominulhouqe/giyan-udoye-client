// src/components/FeeTracking.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, notification } from "antd";

const FeeTracking = () => {
  const [members, setMembers] = useState([]);
  const [fees, setFees] = useState([]);

  useEffect(() => {
    fetchMembers();
    fetchFees();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get("/api/library-members");
      setMembers(response.data);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const fetchFees = async () => {
    try {
      const response = await axios.get("/api/fees");
      setFees(response.data);
    } catch (error) {
      console.error("Error fetching fees:", error);
    }
  };

  const columns = [
    { title: "Member ID", dataIndex: "memberId", key: "memberId" },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => {
        const member = members.find((m) => m._id === record.memberId);
        return member ? member.name : "";
      },
    },
    { title: "Amount Due", dataIndex: "amountDue", key: "amountDue" },
    { title: "Amount Paid", dataIndex: "amountPaid", key: "amountPaid" },
    {
      title: "Balance",
      key: "balance",
      render: (text, record) => record.amountDue - record.amountPaid,
    },
  ];

  return <Table dataSource={fees} columns={columns} rowKey="_id" />;
};

export default FeeTracking;
