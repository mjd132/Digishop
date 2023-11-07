import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Box,
  Button,
  Container,
  Grid,
  Icon,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Buttonn from "./Buttonn";
import { AuthContext } from "../Context/AuthContext";

const Header = ({ setOpenSearchDialog, setOpenBasketShop }) => {
  const authContext = useContext(AuthContext);
  const handleOpenDialog = () => {
    setOpenSearchDialog(true);
  };
  const login = false;
  return (
    <Box sx={{ backgroundColor: blueGrey[900] }}>
      <Container>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h4" sx={{ fontFamily: "Dosis" }}>
            <Link to="/">DGSHOP</Link>
          </Typography>

          <Grid
            container
            sx={{
              border: 0,
              width: { xs: "auto", md: 600 },
              backgroundColor: grey[700],
              borderRadius: 10,
              pl: 3,
              pr: 1,
              my: 1,
              mx: 2,
              display: { xs: "none", sm: "flex" },
            }}
            direction="row"
            alignItems="center"
            className="search-bar"
          >
            <Grid item>
              <Icon sx={{ display: "inline" }}>
                <SearchIcon sx={{ color: "white" }} />
              </Icon>
            </Grid>
            <Grid item>
              <InputBase
                sx={{
                  backgroundColor: grey[700],
                  color: "white",
                  fontSize: 14,
                  fontFamily: "Vazirmatn RD",
                  flexGrow: 1,
                  width: { xs: "auto", md: 525 },
                  mr: 1,
                }}
                placeholder="جستجوی محصول ..."
                inputProps={{ "aria-label": "search" }}
              />
            </Grid>
          </Grid>
          <Grid display={"flex"}>
            <IconButton
              sx={{ display: { xs: "block", sm: "none" } }}
              onClick={handleOpenDialog}
            >
              <SearchIcon sx={{ color: "white" }} />
            </IconButton>
            <IconButton>
              {authContext.auth.user !== null ? (
                <Link to={"/dashboard"}>
                  <Typography sx={{ display: "inline-block" }}>
                    {authContext.auth.user.profile.name}
                  </Typography>
                  <AccountCircleIcon sx={{ color: "white" }} />
                </Link>
              ) : (
                <>
                  <Buttonn variant="outlined" to={"/login"}>
                    ورود | ثبت‌نام
                  </Buttonn>
                </>
              )}
            </IconButton>
            <IconButton onClick={() => setOpenBasketShop(true)}>
              <ShoppingBasketIcon sx={{ color: "white" }} />
            </IconButton>
          </Grid>
        </Toolbar>
      </Container>
    </Box>
  );
};

export default Header;
