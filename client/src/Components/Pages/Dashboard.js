import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import {
  Box,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  styled,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext";
import "../../custom.css";
import Buttonn from "../Buttonn";
import testJson from "../TestJsons/test.json";
const CustomListItemIcon = styled(ListItemIcon)`
  min-width: 30px;
`;

const Dashboard = ({ user, setUser }) => {
  const [orderTable, setOrderTable] = useState(testJson.orders);
  const location = useLocation();
  const { auth } = useAuthContext();

  // if (authContext.isAuth === false) return <Navigate to={"/login"} />;

  const sidebarList = testJson.sidebarListDashboard;
  const currentTab =
    sidebarList.find((i) => i.url === location.pathname) || sidebarList[0];
  // const itemStyle = { "&.hover": { backgroundColor: grey[700] } };

  return (
    <>
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
                    {sidebarList &&
                      sidebarList
                        .filter((i) => i.title !== "پروفایل")
                        .map((i, index) => (
                          <NavLink to={i.url} key={i.id}>
                            <ListItem>
                              <ListItemButton
                                selected={currentTab.id === i.id}
                                sx={{
                                  "&:hover": { backgroundColor: grey[800] },
                                  "&&.Mui-selected": {
                                    backgroundColor: "#313131",
                                  },
                                  borderRadius: 2,
                                }}
                                // sx={{
                                //   backgroundColor:
                                //     currentTab.id === i.id ? grey[800] : null,
                                //   ...itemStyle,
                                // }}
                              >
                                <CustomListItemIcon>
                                  <ShoppingCartCheckoutIcon
                                    sx={{ color: grey[300] }}
                                  />
                                </CustomListItemIcon>
                                <ListItemText>
                                  <Typography
                                    sx={{
                                      fontWeight:
                                        currentTab.id === i.id ? 600 : 400,
                                    }}
                                    fontWeight={300}
                                  >
                                    {i.title}
                                  </Typography>
                                </ListItemText>
                              </ListItemButton>
                            </ListItem>
                            {index !== sidebarList.length - 1 ? (
                              <Divider
                                variant="middle"
                                component="li"
                                sx={{ borderColor: grey[800] }}
                              />
                            ) : null}
                          </NavLink>
                        ))}
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
    </>
  );
};

export default Dashboard;
