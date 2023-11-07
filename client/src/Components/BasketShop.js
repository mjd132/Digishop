import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { blueGrey, grey, red } from "@mui/material/colors";
import React from "react";

const BasketShop = ({ open, onClose, listShop }) => {
  return (
    <Drawer
      anchor={"left"}
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { backgroundColor: grey[800] } }}
    >
      <Box
        sx={{
          backgroundColor: grey[800],
          minWidth: { xs: "70vw", sm: "50vw", md: "25vw" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid " + grey[600],
            alignItems: "center",
            p: 1,
            boxShadow: 2,
            backgroundColor: grey[700],
          }}
        >
          <Typography
            sx={{ color: grey[200], pr: 1 }}
            variant="h6"
            fontWeight={300}
          >
            سبد خرید
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon sx={{ color: grey[200] }} />
          </IconButton>
        </Box>

        <Box>
          <List>
            <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ color: "white", p: 1 }} variant="body1">
                لپتاپ ایسوس
              </Typography>
              <IconButton>
                <DeleteIcon sx={{ color: red[500] }} />
              </IconButton>
            </ListItem>
          </List>
        </Box>
      </Box>
      <Button sx={{ color: "white", backgroundColor: blueGrey[600], mx: 2 }}>
        ثبت نهایی خرید
      </Button>
    </Drawer>
  );
};

export default BasketShop;
