import React from "react";
import { default as AuthContextProvider } from "./Context/AuthContext";
import "./custom.css";
import Router from "./Router";

const App = () => {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
};

export default App;
