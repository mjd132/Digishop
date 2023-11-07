import { Box, Paper, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import CategoryProducts from "../CategoryProducts";
import E504 from "../E504";
import Loading from "../Loading";
import Slider from "../Slider";
const Home = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  if (!content)
    axios
      .get("/api/main")
      .then((res) => {
        console.log(res.data);
        setContent(res.data);
      })
      .catch((err) => {
        if (err.response.status === 504) setContent(504);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });

  if (loading) return <Loading />;
  if (content === 504) return <E504 />;
  return (
    <Paper
      sx={{
        backgroundColor: grey[900],
        color: grey[100],
        mt: 0.5,
      }}
      elevation={0}
    >
      <Slider images={content.slider} autoplay={true} />
      <Box sx={{ py: 3 }}>
        <Typography variant="h6" fontWeight={300} textAlign={"center"}>
          خرید براساس دسته بندی
        </Typography>
        <CategoryProducts category={content.categories} />
      </Box>
      <Box
        sx={{
          my: 3,
          border: "2px solid " + grey[600],
          borderRadius: 5,
          pb: "17px",
          px: 2,
        }}
      >
        <Typography
          variant="h6"
          fontWeight={300}
          sx={{
            transform: "translateY(-17px)",
            backgroundColor: grey[900],
            width: "fit-content",
            mx: "auto",
            px: 2,
          }}
        >
          پیشنهاد دیجی‌شاپ
        </Typography>
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
                <Box
                  sx={{ borderRadius: "50%", backgroundColor: "white", p: 2 }}
                >
                  <img
                    alt={i.alt}
                    src={i.imageSrc}
                    style={{ backgroundColor: "white" }}
                    width={60}
                    height={60}
                  />
                </Box>
                <Typography sx={{ textAlign: "center", mt: 1 }}>
                  {i.alt}
                </Typography>
              </Link>
            ))}
        </Box>
      </Box>
    </Paper>
  );
};

export default Home;
