import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const OfferProducts = ({ content }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
      }}
    >
      {content.offerProducts &&
        content.offerProducts.map((i) => (
          <Link className="p-2">
            <Box sx={{ borderRadius: "50%", backgroundColor: "white", p: 2 }}>
              <img
                alt={i.alt}
                src={i.imageSrc}
                style={{ backgroundColor: "white" }}
                width={60}
                height={60}
              />
            </Box>
            <Typography sx={{ textAlign: "center", mt: 1 }}>{i.alt}</Typography>
          </Link>
        ))}
    </Box>
  );
};

export default OfferProducts;
