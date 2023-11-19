import React from "react";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext";
import "../../custom.css";
import AdminDashboard from "../AdminDashboard";
import sidebarlist from "../SettingJsons/SidebarList.json";
import UserDashboard from "../UserDashboard";

const Dashboard = ({ user, setUser }) => {
  const location = useLocation();
  const { auth } = useAuthContext();

  // const sidebarList = sidebarlist.sidebarListDashboard;

  // sidebarlist.sidebarListAdminDashboard.find(
  //   (i) => i.url === location.pathname
  // ) || sidebarListUserDashboard[0];

  if (auth.user.role === "admin") {
    const currentTab =
      sidebarlist.sidebarListAdminDashboard.find(
        (item) => item.url === location.pathname
      ) || sidebarlist.sidebarListAdminDashboard[0];

    return <AdminDashboard currentTab={currentTab} />;
  }
  const currentTab =
    sidebarlist.sidebarListUserDashboard.find(
      (item) => item.url === location.pathname
    ) || sidebarlist.sidebarListUserDashboard[0];

  return <UserDashboard currentTab={currentTab} />;
};

export default Dashboard;
