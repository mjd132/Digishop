import { Box, Paper, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import RequstServer from "../../hook/request";
import CategoryProducts from "../CategoryProducts";
import E504 from "../E504";
import Loading from "../Loading";
import OfferProducts from "../OfferProducts";
import Slider from "../Slider";

const Home = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const { Get } = RequstServer();

  const getData = async () => {
    setLoading(true);
    try {
      const response = await Get("/api/main");
      console.log("response", response);
      setContent(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setContent(504);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
        <OfferProducts content={content} />
      </Box>
    </Paper>
  );
};
export default Home;
