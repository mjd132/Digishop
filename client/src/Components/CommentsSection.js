import { Box, IconButton, Typography } from "@mui/material";
import { green, grey, red } from "@mui/material/colors";
import React from "react";

import ThumbDownRoundedIcon from "@mui/icons-material/ThumbDownRounded";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";

const CommentsSection = ({ comments }) => {
  return (
    <>
      {/* Mobile Display */}
      <Box
        sx={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
          overflowX: "auto",
          display: { xs: "flex", md: "none" },
          pb: 1.5,
        }}
      >
        {comments &&
          comments.slice(0, 4).map((i) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                ml: 1,
                p: 2,
                pt: 1,
                minWidth: "260px",
                height: "170px",
                border: "1px solid " + grey[600],
                borderRadius: 3,
              }}
            >
              <Box display={"flex"} alignItems={"baseline"}>
                <Box
                  sx={{
                    backgroundColor: grey[100],
                    color: grey[900],
                    borderRadius: 1,
                    alignSelf: "baseline",
                    px: 1,
                    fontWeight: 900,
                    ml: 1,
                    fontSize: 12,
                  }}
                >
                  {i.star}
                </Box>
                <Typography fontSize={{ xs: 16, sm: 18 }}>{i.title}</Typography>
              </Box>
              <Typography
                fontSize={{ xs: 12, sm: 14 }}
                sx={{
                  WebkitLineClamp: 3,
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  mt: 1,
                }}
                fontWeight={300}
              >
                {i.text}
              </Typography>
              <Box display={"flex"} alignItems={"baseline"} marginTop={"auto"}>
                <Typography fontSize={{ xs: 10, sm: 12 }} color={grey[500]}>
                  {i.writer}
                </Typography>
                <Typography
                  fontSize={{ xs: 12, sm: 14 }}
                  color={grey[500]}
                  marginX={1}
                >
                  {" - "}
                </Typography>

                <Typography color={grey[500]} fontSize={{ xs: 10, sm: 12 }}>
                  {i.dateSubmited}
                </Typography>
              </Box>
            </Box>
          ))}
      </Box>
      {/* Desktop Display */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          pb: 1.5,
        }}
      >
        {comments &&
          comments.slice(0, 3).map((i) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",

                p: 2,
                pt: 1,
                minWidth: "260px",
                height: "170px",
                borderBottom: "1px solid " + grey[600],
              }}
            >
              <Box display={"flex"} alignItems={"baseline"}>
                <Box
                  sx={{
                    backgroundColor: grey[100],
                    color: grey[900],
                    borderRadius: 1,
                    alignSelf: "baseline",
                    px: 1,
                    fontWeight: 900,
                    ml: 1,
                    fontSize: 12,
                  }}
                >
                  {i.stars}
                </Box>
                <Typography fontSize={{ xs: 16, sm: 18 }}>{i.title}</Typography>
              </Box>
              <Typography
                fontSize={{ xs: 12, sm: 14 }}
                sx={{
                  WebkitLineClamp: 3,
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  mt: 1,
                }}
                fontWeight={300}
              >
                {i.text}
              </Typography>
              <Box
                display={"flex"}
                alignItems={"baseline"}
                justifyContent={"space-between"}
                marginTop={"auto"}
              >
                <Box display={"flex"} alignItems={"baseline"}>
                  <Typography fontSize={{ xs: 10, sm: 12 }} color={grey[500]}>
                    {i.writer}
                  </Typography>
                  <Typography
                    fontSize={{ xs: 12, sm: 14 }}
                    color={grey[500]}
                    marginX={1}
                  >
                    {" - "}
                  </Typography>

                  <Typography color={grey[500]} fontSize={{ xs: 10, sm: 12 }}>
                    {i.dateSubmited}
                  </Typography>
                </Box>
                <Box sx={{}}>
                  <IconButton>
                    <Typography sx={{ color: grey[500], ml: 1 }}>
                      {i.likes}
                    </Typography>
                    <ThumbUpRoundedIcon
                      sx={{
                        color: i.liked ? green[500] : grey[700],
                      }}
                    />
                  </IconButton>
                  <IconButton>
                    <Typography sx={{ color: grey[500], ml: 1 }}>
                      {i.disLikes}
                    </Typography>
                    <ThumbDownRoundedIcon
                      sx={{
                        color:
                          i.liked !== null && i.liked === false
                            ? red[500]
                            : grey[700],
                      }}
                    />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          ))}
      </Box>
    </>
  );
};

export default CommentsSection;
