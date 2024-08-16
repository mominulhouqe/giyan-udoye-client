import SideNavbar from "./DashboardComponent/SideNavber";
import { Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <div className="p-2 flex gap-4 ">
      <SideNavbar />
      <div className=" flex-1 border p-2 rounded-md">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
