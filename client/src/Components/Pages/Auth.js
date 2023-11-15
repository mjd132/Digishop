import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext";
import Login from "../Login";
import Signup from "../Signup";
//...Imports
const Auth = ({ user, setUser }) => {
  const [authForm, setAuthForm] = useState({ mobile: "", password: "" });
  const [isShowloginForm, setShowLoginForm] = useState(true);

  const authContext = useAuthContext();

  const switchLoginSignup = () => {
    if (isShowloginForm) {
      setAuthForm({ mobile: "", password: "", rePassword: "" });
      setShowLoginForm(false);
    } else {
      setAuthForm({ mobile: "", password: "" });
      setShowLoginForm(true);
    }
  };

  const authenticate = async (e) => {
    e.preventDefault();
    await authContext.login(authForm);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          border: { xs: "", md: "1px solid" },
          display: "flex",
          flexDirection: "column",
          p: 2,
          my: "auto",
          borderRadius: 5,
          maxWidth: { xs: "100vw", md: "400px" },
          width: "100%",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontFamily: "Dosis",
            px: 2,
            textAlign: "center",
            width: "fit-content",
            transform: "translateY(-48px)",
            backgroundColor: grey[900],
            alignSelf: "center",
          }}
        >
          <Link to="/">DGSHOP</Link>
        </Typography>
        {/** ...return section */}
        {isShowloginForm ? (
          <Login
            authForm={authForm}
            setAuthForm={setAuthForm}
            authMethod={authenticate}
            switchToSignup={switchLoginSignup}
          />
        ) : (
          <Signup
            authForm={authForm}
            setAuthForm={setAuthForm}
            authMethod={authenticate}
            switchToLogin={switchLoginSignup}
          />
        )}
      </Box>
    </Box>
  );
};

export default Auth;
