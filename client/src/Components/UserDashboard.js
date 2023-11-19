import { Box, Container, Divider, Grid, List, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Buttonn from "./Buttonn";
import testjson from "./SettingJsons/test.json";
import { useAuthContext } from "../Context/AuthContext";
import sidebarlist from "./SettingJsons/SidebarList.json";
import SidebarDashboard from "./SidebarDashboard";

const UserDashboard = ({ currentTab }) => {
  const { auth } = useAuthContext();
  const [orderTable, setOrderTable] = useState(testjson.orders);
  const sidebarListUserDashboard = sidebarlist.sidebarListUserDashboard;
  console.table(sidebarListUserDashboard);
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
                    currentTab={currentTab}
                    sidebarList={sidebarListUserDashboard}
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
                <Outlet context={[orderTable, setOrderTable]} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default UserDashboard;
