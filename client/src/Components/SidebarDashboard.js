import styled from "@emotion/styled";
import {
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { NavLink } from "react-router-dom";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

const CustomListItemIcon = styled(ListItemIcon)`
  min-width: 30px;
`;

const SidebarDashboard = ({ sidebarList, currentTab }) => {
  return (
    <>
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
                >
                  <CustomListItemIcon>
                    <ShoppingCartCheckoutIcon sx={{ color: grey[300] }} />
                  </CustomListItemIcon>
                  <ListItemText>
                    <Typography
                      sx={{
                        fontWeight: currentTab.id === i.id ? 600 : 400,
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
    </>
  );
};

export default SidebarDashboard;
