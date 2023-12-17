import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
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
import { useSnackbar } from "notistack";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";
import RequstServer from "../hook/request";
// import Snackbar from "./Snackbar";

const BasketShop = ({ open, onClose, listShop }) => {
  const { auth, setAuth, submitOrder } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const deleteItemFromBasket = (e, productId) => {
    e.preventDefault();
    RequstServer()
      .PostData("/api/cart", null, {
        id: productId,
        action: "delete",
      })
      .then((res) => {
        setAuth({ user: res.data, isAuth: true });
        enqueueSnackbar({ variant: "info", message: "از لیست حذف شد!" });
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 504)
          enqueueSnackbar({
            message: "خطا در ارتباط با سرور !",
            variant: "error",
          });
      });
  };
  const submitButton = () => {
    navigate("/final");
  };
  return (
    <Drawer
      anchor={"left"}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: grey[800],
          maxWidth: { xs: "100vw", sm: "70vw", md: "30vw" },
        },
      }}
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
            {auth.user &&
              auth.user.cart &&
              auth.user.cart.map((i, index) => (
                <ListItem
                  sx={{ display: "flex", justifyContent: "space-between" }}
                  key={index}
                >
                  <Typography sx={{ color: "white", p: 1 }} variant="body1">
                    {i.productName}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography color={"white"}>{"x" + i.count}</Typography>
                    <IconButton
                      onClick={(e) => deleteItemFromBasket(e, i.productId)}
                    >
                      <DeleteIcon sx={{ color: red[500] }} />
                    </IconButton>
                  </Box>
                </ListItem>
              ))}
          </List>
        </Box>
      </Box>
      <Button
        sx={{ color: "white", backgroundColor: blueGrey[600], mx: 2 }}
        onClick={submitButton}
      >
        ثبت نهایی خرید
      </Button>
    </Drawer>
  );
};

export default BasketShop;
