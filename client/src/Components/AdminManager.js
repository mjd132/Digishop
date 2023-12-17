import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import RequstServer from "../hook/request";
import { red } from "@mui/material/colors";
import { useSnackbar } from "notistack";

const AdminManager = () => {
  const [adminMobile, setAdminMobile] = useState("");
  const [admins, setAdmins] = useState();
  const { enqueueSnackbar } = useSnackbar();
  const { Get, Put, Delete } = RequstServer();
  useEffect(() => {
    Get("/api/admin")
      .then((result) => {
        setAdmins(result.data);
        console.log(result);
      })
      .catch((err) => {
        setAdmins(null);
      });
  }, []);
  const addAdmin = async () => {
    if (adminMobile !== "")
      await Put("/api/admin", null, { mobile: adminMobile })
        .then((result) => {
          setAdmins(result.data);
          enqueueSnackbar("مدیر با موفقیت افزوده شد !", {
            variant: "success",
          });
        })
        .catch((err) => {
          enqueueSnackbar("کاربر با این موبایل وجود ندارد !", {
            variant: "error",
          });
        });
    else enqueueSnackbar("موبایل خالی می باشد !", { variant: "error" });
  };
  const deleteAdmin = async (mobile) => {
    await Delete("/api/admin", { mobile: mobile })
      .then((result) => {
        setAdmins(result.data);
        enqueueSnackbar("مدیر با موفقیت حذف شد !", {
          variant: "success",
        });
      })
      .catch((err) => {});
  };
  const handleChange = (e) => {
    setAdminMobile(e.target.value);
  };
  return (
    <Box>
      <Typography fontSize={18} fontWeight={500}>
        افزودن مدیر
      </Typography>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          addAdmin();
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <FormControl sx={{ m: 1 }}>
            <TextField
              label="موبایل"
              variant="outlined"
              name="adminMobile"
              value={adminMobile}
              onChange={(e) => {
                handleChange(e);
              }}
              dir="rtl"
            />
          </FormControl>
          <Button type="submit" variant="contained">
            افزودن
          </Button>
        </Box>
      </form>

      <Divider component={"div"} sx={{ my: 1 }} />
      <Typography fontSize={18} fontWeight={500}>
        مدیران
      </Typography>
      <Box sx={{ display: "flex" }}>
        {admins &&
          admins.map((i, index) => {
            return (
              <Paper
                sx={{
                  width: "fit-content",
                  pr: 2,
                  display: "flex",
                  mt: 1,
                  ml: 1,
                }}
                variant="outlined"
              >
                <Box>
                  <Typography>
                    {i.name && i.name} {i.family && i.family}
                  </Typography>
                  <Typography fontSize={12} fontWeight={200}>
                    {"شماره موبایل: " + i.mobile}
                  </Typography>
                </Box>
                <IconButton
                  onClick={(e) => {
                    e.preventDefault();
                    deleteAdmin(i.mobile);
                  }}
                >
                  <DeleteIcon sx={{ color: red[500] }} />
                </IconButton>
              </Paper>
            );
          })}
      </Box>
    </Box>
  );
};

export default AdminManager;
