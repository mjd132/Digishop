import { Box, Container, Divider, Grid, List, Typography } from "@mui/material";
import React from "react";
import Buttonn from "./Buttonn";
import { Outlet } from "react-router-dom";
import { grey } from "@mui/material/colors";
import SidebarDashboard from "./SidebarDashboard";
import SidebarList from "./SettingJsons/SidebarList.json";
import { useAuthContext } from "../Context/AuthContext";
const AdminDashboard = ({ currentTab }) => {
  const { auth } = useAuthContext();
  const sidebarList = SidebarList.sidebarListAdminDashboard;
  return (
    <Container>
      <div style={{ marginBlock: 16 }}>
        <Grid
          container
          display={"flex"}
          spacing={2}
          sx={{ flexDirection: { xs: "column", md: "row" } }}
        >
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                border: { sm: "1px solid" + grey[600] },
                borderRadius: 3,
                p: { xs: 0, sm: 2 },
              }}
            >
              <Box
                display={"flex"}
                sx={{ alignItems: "center", justifyContent: "space-between" }}
              >
                <Box>
                  <Typography variant="h6">
                    {auth.user.profile.name && auth.user.profile.name}{" "}
                    {auth.user.profile.family && auth.user.profile.family}
                  </Typography>
                  <Typography variant="body1" fontWeight={200}>
                    {auth.user.profile.mobile}
                  </Typography>
                </Box>
                <Buttonn to={"/dashboard/profile"} variant={"outlined"}>
                  ویرایش پروفایل
                </Buttonn>
              </Box>
              <Divider
                component={"div"}
                sx={{ my: 2, borderColor: grey[500] }}
              />
              <Box>
                <List dir={"rtl"}>
                  <SidebarDashboard
                    sidebarList={sidebarList}
                    currentTab={currentTab}
                  />
                </List>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={8} sx={{ mt: { xs: 4, sm: 0 } }}>
            <Box
              sx={{ border: "1px solid" + grey[600], borderRadius: 3, p: 2 }}
            >
              <Box
                display={"flex"}
                sx={{
                  transform: "translateY(-32px)",
                }}
              >
                <Typography
                  sx={{ backgroundColor: grey[900], px: 2 }}
                  variant="h5"
                  fontWeight={500}
                >
                  {currentTab && currentTab.title}
                </Typography>
              </Box>
              <Box>
                <Outlet />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default AdminDashboard;
