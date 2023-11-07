import { Box, Button, InputBase, Typography } from "@mui/material";
import React, { useState } from "react";
import { useAuthContext } from "../Context/AuthContext";
import { blueGrey, grey, red } from "@mui/material/colors";
const Input = ({ type, name, placeholder, value, sx, onChange, disabled }) => {
  return (
    <InputBase
      type={type}
      name={name}
      placeholder={placeholder}
      sx={{
        borderRadius: 3,
        border: "1px solid " + grey[500],
        px: 1,
        py: 0.5,
        color: "white",
        width: "100%",
        mt: 1,
        ...sx,
      }}
      onChange={(e) => onChange(e.target.value, name)}
      value={value}
      disabled={disabled}
    />
  );
};

const ProfileEditor = () => {
  const authContext = useAuthContext();
  const [profile, setProfile] = useState(authContext.auth.user.profile);
  const handleOnChange = (value, name) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };
  const checkValidationForm = () => {
    console.log(profile);
    if (profile.oldPass !== "" && profile.rePass !== profile.pass) return false;

    if (profile.mobile === "") return false;
    return true;
  };
  const submitProfileEdit = (e) => {
    e.preventDefault();
    if (!checkValidationForm()) return;

    authContext.editProfile(profile);
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex" }}>
        {/* <Typography>نام:</Typography> */}
        <Input
          type="text"
          name="name"
          onChange={handleOnChange}
          value={profile.name}
          placeholder={"نام"}
        />

        {/* <Typography>نام خانوادگی:</Typography> */}
        <Input
          type="text"
          name="family"
          onChange={handleOnChange}
          value={profile.family}
          placeholder={"نام خانوادگی"}
          sx={{ mr: 2 }}
        />
      </Box>
      <Box sx={{ display: "flex" }}>
        {/* <Typography>نام:</Typography> */}
        <Input
          type="text"
          name="mobile"
          onChange={handleOnChange}
          value={profile.mobile}
          placeholder={"شماره موبایل"}
          disabled={true}
        />

        {/* <Typography>نام خانوادگی:</Typography> */}
        <Input
          type="text"
          name="email"
          onChange={handleOnChange}
          value={profile.email}
          placeholder={"ایمیل"}
          sx={{ mr: 2 }}
        />
        <Input
          type="date"
          name="birthday"
          onChange={handleOnChange}
          value={profile.birthday}
          placeholder={"تاریخ تولد"}
          sx={{ mr: 2 }}
        />
      </Box>
      <Typography sx={{ mt: 2 }}>تغییر رمز عبور</Typography>
      <Box sx={{ display: "flex" }}>
        <Input
          type="password"
          name="oldPass"
          placeholder="رمز عبور کنونی"
          onChange={handleOnChange}
          value={profile.oldPass}
        />
        <Input
          type="password"
          name="pass"
          placeholder="رمز عبور جدید"
          onChange={handleOnChange}
          value={profile.pass}
          sx={{ mr: 2 }}
        />
        <Input
          type="password"
          name="rePass"
          placeholder="تکرار رمز جدید"
          onChange={handleOnChange}
          value={profile.rePass}
          sx={{ mr: 2 }}
        />
      </Box>
      <Button
        variant="outlined"
        sx={{
          mt: 2,
          color: blueGrey[200],
          width: { xs: "100%", md: "fit-content" },
        }}
        onClick={(e) => {
          submitProfileEdit(e);
        }}
      >
        ذخیره تغییرات
      </Button>
    </Box>
  );
};

export default ProfileEditor;
