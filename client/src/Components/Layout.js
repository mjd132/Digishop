import React, { Suspense } from "react";

import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Loading from "./Loading";

const Layout = () => {
  return (
    <>
      <Container sx={{ mb: 2, flexGrow: 1 }}>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
