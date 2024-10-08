import React from "react";
import SideNavbar from "./DashboardComponent/SideNavber";
import { Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="lg:w-64 bg-white shadow-md">
        <SideNavbar />
      </div>
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">
            Admin Dashboard
          </h1>
          <div className="bg-white rounded-lg shadow-md p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
