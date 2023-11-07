import { Box, Button, ButtonBase, InputBase, Typography } from "@mui/material";
import React, { useState } from "react";
import Buttonn from "./Buttonn";
import { blue, blueGrey, grey, red } from "@mui/material/colors";

const Login = ({
  authForm,
  setAuthForm,
  authMethod,
  switchToSignup,
  error,
}) => {
  const [errorText, setErrorText] = useState(null);

  const checkInput = () => {
    if (authForm.mobile === "") {
      setErrorText("لطفا موبایل خود را وارد نمایید!");
      return false;
    }
    if (authForm.password === "") {
      setErrorText("لطفا رمز عبور خود را وارد نمایید!");
      return false;
    }
    // if (error === 2001) {
    //   setErrorText("شماره موبایل صحیح نمی باشد!");
    //   return true;
    // }
    // if (error === 2002) {
    //   setErrorText("رمز عبور اشتباه است!");
    //   return true;
    // }
    setErrorText(null);
    return true;
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" marginBottom={2} fontWeight={300}>
        وارد شوید:
      </Typography>
      <InputBase
        name="mobile"
        sx={{
          borderRadius: 3,
          border:
            "1px solid " + (authForm.mobile === "" ? red[500] : grey[500]),

          px: 1,
          py: 0.5,
          color: "white",
          width: "100%",
        }}
        placeholder="موبایل"
        autoFocus={true}
        onChange={(e) => setAuthForm({ ...authForm, mobile: e.target.value })}
        onBlur={checkInput}
        onFocus={() => setErrorText(null)}
      />
      <InputBase
        type="password"
        name="password"
        placeholder="رمز عبور"
        sx={{
          borderRadius: 3,
          border:
            "1px solid " + (authForm.password === "" ? red[500] : grey[500]),

          px: 1,
          py: 0.5,
          color: "white",
          width: "100%",
          mt: 1,
        }}
        onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
        onBlur={checkInput}
        onFocus={() => setErrorText(null)}
      />
      <Typography marginTop={1} fontSize={14} color={red[500]}>
        {errorText && errorText}
      </Typography>

      <ButtonBase
        sx={{
          width: "100%",
          backgroundColor: blueGrey[700],
          marginTop: 4,
          borderRadius: 3,
          color: "white",

          py: 1,
        }}
        variant="contained"
        onClick={(e) => (checkInput() ? authMethod(e) : null)}
      >
        ورود
      </ButtonBase>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 2,
        }}
      >
        <Buttonn>
          <Typography color={blue[500]}>فراموشی رمز عبور</Typography>
        </Buttonn>
        <Button onClick={switchToSignup}>
          <Typography color={blue[500]}>حساب ندارید؟ ثبت نام کنید.</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
