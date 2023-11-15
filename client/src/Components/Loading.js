import { Box, LinearProgress, Typography } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <LinearProgress color="secondary" />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h5">در حال بارگذاری سایت . . .</Typography>
      </Box>
    </>
  );
};

export default Loading;
