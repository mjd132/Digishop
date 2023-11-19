import { lazy } from "react";
import { Navigate } from "react-router-dom";
import LayoutMain from "./Components/LayoutMain";
import { useAuthContext } from "./Context/AuthContext";
import Reports from "./Components/Reports";
import Ordered from "./Components/Ordered";
import AdminManager from "./Components/AdminManager";
const Dashboard = lazy(() => import("./Components/Pages/Dashboard"));
const Orders = lazy(() => import("./Components/OrdersTable"));
const Logout = lazy(() => import("./Components/Logout"));
const ProfileEditor = lazy(() => import("./Components/ProfileEditor"));
const ReturnedList = lazy(() => import("./Components/ReturnedList"));
const LikedList = lazy(() => import("./Components/ReturnedList"));

export default function ProtectedRoutes() {
  const { auth } = useAuthContext();
  const routes = () => {
    if (auth.user.role === "admin")
      return [
        {
          path: "",
          element: <Dashboard />,
          children: [
            { index: true, element: <Reports /> },
            { path: "reports", element: <Reports /> },
            { path: "ordered", element: <Ordered /> },
            { path: "adminmanager", element: <AdminManager /> },
            { path: "profile", element: <ProfileEditor /> },
            { path: "logout", element: <Logout /> },
          ],
        },
      ];
    else if (auth.user.role === "user")
      return [
        {
          path: "",
          element: <Dashboard />,
          children: [
            { index: true, element: <Orders /> },
            { path: "orders", element: <Orders /> },
            { path: "returnedlist", element: <ReturnedList /> },
            { path: "profile", element: <ProfileEditor /> },
            { path: "list", element: <LikedList /> },
            { path: "logout", element: <Logout /> },
          ],
        },
      ];
  };
  return [
    {
      path: "/dashboard",
      element: <LayoutMain />,
      children: routes(),
    },
    {
      path: "/login",
      element: <Navigate to={"/dashboard"} />,
    },
  ];
}
