import { AppBar } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import "../custom.css";
import BasketShop from "./BasketShop";
import Header from "./Header";
import SearchDialog from "./SearchDialog";

function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState(null);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)
      ) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener("scroll", updateScrollDirection); // add event listener
    return () => {
      window.removeEventListener("scroll", updateScrollDirection); // clean up
    };
  }, [scrollDirection]);

  return scrollDirection;
}

const NavMenu = () => {
  const [openSearchDialog, setOpenSearchDialog] = useState(false);
  const [openBasketShop, setOpenBasketShop] = useState(false);
  const scrollDirection = useScrollDirection();

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
        // height: `${scrollDirection === "down" ? 65 : 95}px`,
        borderBottom: "1px solid " + grey[700],
        transitionProperty: "all",
        transitionDelay: "50ms",
        transitionTimingFunction: "ease-in-out",
      }}
      position="sticky"
      elevation={0}
    >
      <Header
        openSearchDialog={openSearchDialog}
        setOpenSearchDialog={setOpenSearchDialog}
        setOpenBasketShop={setOpenBasketShop}
        scrollDirection={scrollDirection}
      />
      <BasketShop onClose={handleCloseBasketShop} open={openBasketShop} />
      {/* <SubHeader scrollDirection={scrollDirection} /> */}
      <SearchDialog open={openSearchDialog} onClose={handleCloseDialog} />
    </AppBar>
  );
};

export default NavMenu;
