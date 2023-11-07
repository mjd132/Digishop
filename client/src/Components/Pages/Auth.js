import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext";
import Login from "../Login";
import Signup from "../Signup";
const Auth = ({ user, setUser }) => {
  const [authForm, setAuthForm] = useState({ mobile: "", password: "" });
  const [loginForm, setLoginForm] = useState(true);
  const [error, setError] = useState();
  const authContext = useAuthContext();
  const navigate = useNavigate();
  const switchLoginSignup = () => {
    if (loginForm) {
      setAuthForm({ mobile: "", password: "", rePassword: "" });
      setLoginForm(false);
    } else {
      setAuthForm({ mobile: "", password: "" });
      setLoginForm(true);
    }
  };

  const authentiate = async (e) => {
    e.preventDefault();

    console.log(authForm);
    const res = await authContext.login(authForm);

    if (res) {
      console.log("navigate to dashboard");
      navigate("/dashboard");
    }
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
        {/* <Typography>لطفا شماره موبایل یا ایمیل خود را وارد کنید</Typography> */}
        {loginForm ? (
          <Login
            authForm={authForm}
            setAuthForm={setAuthForm}
            authMethod={authentiate}
            setLoginForm={setLoginForm}
            switchToSignup={switchLoginSignup}
            error={error}
          />
        ) : (
          <Signup
            authForm={authForm}
            setAuthForm={setAuthForm}
            authMethod={authentiate}
            switchToLogin={switchLoginSignup}
            error={error}
          />
        )}
      </Box>
    </Box>
  );
};

export default Auth;
