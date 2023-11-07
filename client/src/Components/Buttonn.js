import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const Buttonn = ({ to, variant, color, children }) => {
  return (
    <Link to={to}>
      <Button variant={variant} color={color}>
        {children}
      </Button>
    </Link>
  );
};

export default Buttonn;
