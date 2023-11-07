import { Box, Typography } from "@mui/material";
import React from "react";

const E504 = () => {
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
        504
      </Typography>
      <Typography variant="body" marginBottom={2}>
        خطا در برقراری ارتباط با سرور !!!
      </Typography>
    </Box>
  );
};

export default E504;
