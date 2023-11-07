import { Box, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h1" fontWeight={900}>
        404
      </Typography>
      <Typography marginBottom={2}>صفحه مورد نظر پیدا نشد !</Typography>
      <Link to={"/"} style={{ color: blue[400] }}>
        بازگشت به صفحه اصلی سایت
      </Link>
    </Box>
  );
};

export default PageNotFound;
