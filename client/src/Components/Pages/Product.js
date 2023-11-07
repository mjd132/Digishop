import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";

import {
  Box,
  Button,
  ButtonBase,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { blue, green, grey, red } from "@mui/material/colors";
import React, { useState } from "react";
import ColorSelector from "../ColorSelector";
import CommentsSection from "../CommentsSection";
import Linnk from "../Linnk";
import Slider from "../Slider";
import { useAuthContext } from "../../Context/AuthContext";
import Loading from "../Loading";
import axios from "axios";
import { useParams } from "react-router-dom";
import PageNotFound from "../PageNotFound";
import E504 from "../E504";

const ShopingButton = ({ addToBasket }) => {
  return (
    <ButtonBase
      variant="contained"
      sx={{
        backgroundColor: green[800],
        p: "4px 16px",
        "& :hover": { backgroundColor: green[800] },
        boxShadow: 4,
        borderRadius: 2,
        minWidth: { xs: "50%", md: "auto" },
        width: { md: "100%" },
        height: { xs: 35, sm: 45 },
      }}
      onClick={(e) => {
        addToBasket(e);
      }}
    >
      <Typography fontSize={{ xs: 12, sm: 20, md: 16, lg: 18 }}>
        افزودن به سبد خرید
      </Typography>
    </ButtonBase>
  );
};

const Product = () => {
  const [productDetail, setProductDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const { productId } = useParams();
  const { auth } = useAuthContext();
  if (!productDetail)
    axios
      .get(`/api/product/${productId}`)
      .then((res) => {
        console.log(res.data);
        setProductDetail(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 504) setProductDetail(504);

        if (err.response.status === 404) setProductDetail(404);
      })
      .finally(() => {
        setLoading(false);
      });
  if (loading) return <Loading />;
  if (productDetail === 404) return <PageNotFound />;
  if (productDetail === 504) return <E504 />;
  const addToBasket = (e) => {
    e.preventDefault();
    if (!auth.isAuth) return;
  };
  return (
    <Box sx={{ mt: 2, pb: "100px" }}>
      {/* Routes section */}
      <Box sx={{ height: 40, display: "flex" }}>
        <Linnk to={"/"} className="d-inline">
          <Typography color={blue[300]} sx={{ display: "inline" }}>
            خانه
          </Typography>
          <span className="mx-2">/</span>
        </Linnk>
      </Box>
      {/* Main Section */}
      <Grid
        container
        display={"flex"}
        spacing={2}
        sx={{
          flexDirection: { xs: "column", md: "row" },
          alignItems: "start",
          zIndex: 1,
        }}
      >
        <Grid item xs={12} md={4}>
          {/* Image Slider of Product */}
          <Box sx={{ mt: 3 }}>
            <Slider images={productDetail.images}></Slider>
          </Box>

          {/* Price in Desktop */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                my: 2,
                alignItems: "baseline",
              }}
            >
              <Typography fontSize={{ md: 25, lg: 30 }}>
                {productDetail.price}
              </Typography>
              <Typography color={grey[200]} fontWeight={100} marginRight={0.2}>
                تومان
              </Typography>
            </Box>
            <ShopingButton>افزودن به سبد خرید</ShopingButton>
          </Box>
        </Grid>
        <Grid item xs={12} md={8} width={{ xs: "100%", md: "auto" }}>
          {/* Tags section */}
          <Box sx={{ display: "flex", alignItems: "baseline" }}>
            {productDetail.tag &&
              productDetail.tag.map((i, index) => (
                <Typography
                  sx={{
                    mr: 1,
                    color: blue[400],
                    fontSize: 14,
                    fontWeight: 200,
                  }}
                >
                  {i}
                  {index === productDetail.tag.length - 1 ? (
                    ""
                  ) : (
                    <span style={{ color: "white" }}>{" / "}</span>
                  )}
                </Typography>
              ))}
          </Box>

          {/* Title Section */}
          <Typography
            fontSize={{ xs: 20, sm: 27, md: 25, lg: 30 }}
            fontWeight={500}
            marginBottom={3}
          >
            {productDetail.title}
          </Typography>

          {/* Under Title section */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              {/* Discription section */}
              <Box>
                <Typography
                  fontSize={{ xs: 16, sm: 18, md: 20 }}
                  variant="body1"
                  fontWeight={400}
                  color={grey[500]}
                >
                  توضیحات
                </Typography>
                <Typography
                  fontSize={{ xs: 16, sm: 20, md: 18, lg: 20 }}
                  fontWeight={300}
                >
                  {productDetail.description}
                </Typography>
              </Box>
              {/* Color Selector section */}
              <Box
                sx={{
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                  mt: 3,
                }}
              >
                <Typography color={grey[400]} variant="h6" fontWeight={400}>
                  رنگ:
                </Typography>
                <ColorSelector colors={productDetail.colors} />
              </Box>
            </Box>
            {/* favorite and share section */}
            <Box
              sx={{
                // borderLeft: "1px solid " + grey[700],
                display: "flex",
                flexDirection: "column",
                height: "fit-content",
                alignSelf: "end",
              }}
            >
              <IconButton>
                {productDetail.userFav ? (
                  <FavoriteIcon sx={{ color: red[500] }} />
                ) : (
                  <FavoriteBorderIcon sx={{ color: grey[400] }} />
                )}
              </IconButton>
              <IconButton>
                <ShareIcon sx={{ color: grey[400] }} />
              </IconButton>
            </Box>
          </Box>

          {/* Feature section */}
          <Box sx={{ borderTop: "2px solid " + grey[600], mt: 4 }}>
            <Typography
              variant={"h6"}
              sx={{
                backgroundColor: grey[900],
                transform: "translateY(-17px)",
                pl: 1,
                width: "fit-content",
                color: grey[400],
              }}
            >
              ویژگی‌ها
            </Typography>
            <Box sx={{ mr: 2 }}>
              {productDetail.features &&
                productDetail.features.map((i) => (
                  <Box sx={{ display: "flex" }}>
                    <Typography color={grey[500]} fontWeight={300}>
                      {i.title}
                    </Typography>
                    <Typography mr={1}>{i.value}</Typography>
                  </Box>
                ))}
            </Box>
          </Box>

          {/* Comments section */}
          <Box
            sx={{
              borderTop: "2px solid " + grey[600],
              mt: 4,
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                variant={"h6"}
                sx={{
                  backgroundColor: grey[900],
                  transform: "translateY(-17px)",
                  pl: 1,
                  width: "fit-content",
                  color: grey[400],
                }}
              >
                دیدگاه‌ها
              </Typography>

              <Typography
                sx={{
                  backgroundColor: grey[900],
                  transform: "translateY(-11px)",
                  pr: 1,
                  width: "fit-content",
                  color: blue[400],
                  fontSize: 14,
                  fontWeight: 500,
                  alignSelf: "baseline",
                }}
              >
                {productDetail.comments.length} دیدگاه
              </Typography>
            </Box>
            <CommentsSection comments={productDetail.comments} />
            <Box>
              <Button
                variant="outlined"
                sx={{
                  maxWidth: "200px",
                  width: "100%",
                }}
              >
                ثبت دیدگاه
              </Button>
            </Box>
          </Box>

          {/* Price in mobile display */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              position: "fixed",
              bottom: 0,
              left: 0,
              backgroundColor: grey[800],
              width: "100vw",
              height: { xs: 70, sm: 90 },
              p: 1,
              alignItems: "center",
              justifyContent: "space-between",
              px: 3,
              zIndex: 4,
            }}
          >
            <ShopingButton />
            <Typography fontSize={{ xs: 16, sm: 24 }} fontWeight={[500]}>
              120,000,000 تومان
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Product;
