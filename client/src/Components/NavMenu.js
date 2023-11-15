import { AppBar } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useState } from "react";
import "../custom.css";
import BasketShop from "./BasketShop";
import Header from "./Header";
import SearchDialog from "./SearchDialog";

const NavMenu = () => {
  const [openSearchDialog, setOpenSearchDialog] = useState(false);
  const [openBasketShop, setOpenBasketShop] = useState(false);

  const handleCloseDialog = () => {
    setOpenSearchDialog(false);
  };
  const handleCloseBasketShop = () => {
    setOpenBasketShop(false);
  };
  return (
    <AppBar
      sx={{
        backgroundColor: grey[900],
        borderBottom: "1px solid " + grey[700],
        transitionProperty: "all",
        transitionDelay: "50ms",
        transitionTimingFunction: "ease-in-out",
      }}
      position="sticky"
      elevation={0}
    >
      <Header
        setOpenSearchDialog={setOpenSearchDialog}
        setOpenBasketShop={setOpenBasketShop}
      />
      <BasketShop onClose={handleCloseBasketShop} open={openBasketShop} />
      <SearchDialog open={openSearchDialog} onClose={handleCloseDialog} />
    </AppBar>
  );
};

export default NavMenu;
