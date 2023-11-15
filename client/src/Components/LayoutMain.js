import React, { Suspense } from "react";
import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Loading from "./Loading";
import NavMenu from "./NavMenu";
import { SnackbarProvider } from "notistack";

const LayoutMain = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <SnackbarProvider maxSnack={3}>
        <NavMenu />
        <Container sx={{ mb: 2, flexGrow: 1 }}>
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </Container>
        <Footer />
      </SnackbarProvider>
    </Box>
  );
};

export default LayoutMain;
