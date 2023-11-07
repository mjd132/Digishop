import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "../custom.css";
const CategoryProducts = (props) => {
  const category = props.category;
  return (
    <Box
      display={"flex"}
      sx={{ p: 2, justifyContent: "space-evenly", flexWrap: "wrap" }}
    >
      {category &&
        category.map((c) => (
          <Link
            key={c.alt}
            to={c.link}
            className="d-flex flex-column align-items-center text-decoration-none font-vazir text-white my-1 mx-3"
          >
            <img
              src={c.imageSrc}
              alt="category"
              style={{ width: "100px", height: "100px" }}
              className="rounded-circle"
            />
            <Typography variant="body2" fontWeight={700} margin={1}>
              {c.alt}
            </Typography>
          </Link>
        ))}
    </Box>
  );
};

export default CategoryProducts;
