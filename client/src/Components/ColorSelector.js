import { Box } from "@mui/material";
import React, { useState } from "react";
import invertColor from "../Utils/ConterastingColor";
import { blue } from "@mui/material/colors";

const ColorSelector = ({ colors }) => {
  const [selectColorProduct, setSelectColorProduct] = useState(0);

  const color = {
    blue: {
      colorName: "آبی",
      color: blue[600],
    },
    black: {
      colorName: "مشکی",
      color: "#111",
    },
  };
  const styleSelectColor = (color, isSelected) => {
    if (!isSelected)
      return {
        border: "1px solid rgba(255,255,255,0.5)",

        fontWeight: 300,
      };
    else
      return {
        border: "3px solid rgba(255,255,255,0.5)",
        // boxShadow: "0 0 5px 1px rgba(150,150,150,0.5)",

        fontWeight: 500,
      };
  };
  return (
    <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
      {colors &&
        colors.map((i, index) => {
          return (
            <Box
              key={index}
              sx={{
                cursor: "pointer",
                boxSizing: "border-box",
                borderRadius: 10,
                backgroundColor: i.hexCode,
                px: 3,
                py: 0.5,
                ml: 1,
                color: invertColor(i.hexCode, true),
                ...styleSelectColor(i.hexCode, index === selectColorProduct),
              }}
              onClick={() => setSelectColorProduct(index)}
            >
              {i.persianName}
            </Box>
          );
        })}
    </Box>
  );
};

export default ColorSelector;
