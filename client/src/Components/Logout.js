import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const Logout = () => {
  const { logout } = useContext(AuthContext);

  logout();
  console.log("logout done");
  return <Navigate to={"/"} />;
};

export default Logout;
