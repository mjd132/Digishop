import React from "react";
import "../custom.css";
import { Container } from "@mui/material";
const SubHeader = (props) => {
  const scrollDirection = props.scrollDirection;

  return (
    <Container
      sx={{
        position: "sticky",
        transitionProperty: "all",
        transitionTimingFunction: "ease-in",
        transitionDuration: "300ms",
        height: "30px",
        transform: `${scrollDirection === "down" ? "translateY(-100%)" : ""}`,
      }}
    >
      SubHeader
    </Container>
  );
};

export default SubHeader;
