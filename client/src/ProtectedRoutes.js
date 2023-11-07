import { lazy } from "react";
import { Navigate } from "react-router-dom";
import LayoutMain from "./Components/LayoutMain";
const Dashboard = lazy(() => import("./Components/Pages/Dashboard"));
const Orders = lazy(() => import("./Components/OrdersTable"));
const Logout = lazy(() => import("./Components/Logout"));
const ProfileEditor = lazy(() => import("./Components/ProfileEditor"));
const ReturnedList = lazy(() => import("./Components/ReturnedList"));
const LikedList = lazy(() => import("./Components/ReturnedList"));

export default function ProtectedRoutes() {
  return [
    {
      path: "/dashboard",
      element: <LayoutMain />,
      children: [
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
      ],
    },
    {
      path: "/login",
      element: <Navigate to={"/dashboard"} />,
    },
  ];
}
