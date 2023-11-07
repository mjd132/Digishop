import React, { useContext, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Loading from "./Components/Loading";
import NotAuthorized from "./Components/NotAuthorized";
import { AuthContext } from "./Context/AuthContext";
import ProtectedRoutes from "./ProtectedRoutes";
import Routes from "./Routes";
const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");

const Router = () => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    console.log(authContext.loading);
  }, [authContext.loading]);
  if (authContext.loading) return <Loading />;

  const routes = createBrowserRouter([
    ...(authContext.auth.isAuth ? ProtectedRoutes() : NotAuthorized()),
    ...Routes(),
  ]);

  return <RouterProvider router={routes} baseUrl={baseUrl} />;
};

export default Router;
