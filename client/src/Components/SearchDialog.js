import { Box, Dialog, IconButton, InputBase, Typography } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const SearchDialog = (props) => {
  const { onClose, open } = props;
  return (
    <Dialog
      onClose={() => onClose()}
      open={open}
      sx={{ background: "rgba(0,0,0,0.7)" }}
      PaperProps={{
        style: {
          backgroundColor: "transparent",
          boxShadow: "none",
          transform: "translateY(-20vh)",
        },
      }}
      fullScreen={false}
    >
      <Typography fontFamily={"Vazirmatn RD FD"} color={"white"}>
        جستجو
      </Typography>
      <Box
        sx={{
          color: "white",
          background: "transparent",
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid",
        }}
      >
        <InputBase
          sx={{
            background: "transparent",
            color: "white",
            fontSize: 14,
            fontFamily: "Vazirmatn RD FD",
            flexGrow: 1,
            width: { xs: "auto", md: 525 },
            mr: 1,
          }}
          placeholder="جستجوی محصول ..."
          inputProps={{ "aria-label": "search" }}
        />
        <IconButton>
          <SearchIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>
    </Dialog>
  );
};

export default SearchDialog;
