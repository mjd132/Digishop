import React, { useContext } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Loading from "./Components/Loading";
import { AuthContext } from "./Context/AuthContext";
import NotAuthorized from "./NotAuthorizedRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import Routes from "./Routes";
const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");

const Router = () => {
  const authContext = useContext(AuthContext);
  if (authContext.loading) return <Loading />;

  const routes = createBrowserRouter([
    ...(authContext.auth.isAuth ? ProtectedRoutes() : NotAuthorized()),
    ...Routes(),
  ]);

  return <RouterProvider router={routes} baseUrl={baseUrl} />;
};

export default Router;
