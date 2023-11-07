import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import {
  Box,
  Container,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: blueGrey[900],
        p: 2,
        borderTop: "1px solid" + blueGrey[600],
      }}
    >
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <List>
            <ListItem sx={{ fontWeight: 700 }}>دسترسی سریع</ListItem>
            <Link to={"/aboutus"}>
              <ListItem sx={{ color: blueGrey[300], fontWeight: 300 }}>
                درباره ما
              </ListItem>
            </Link>
            <Link to={"/contactus"}>
              <ListItem sx={{ color: blueGrey[300], fontWeight: 300 }}>
                تماس با ما
              </ListItem>
            </Link>
          </List>
          <List>
            <ListItem sx={{ fontWeight: 700 }}>خدمات مشتریان</ListItem>
            <ListItem sx={{ color: blueGrey[300], fontWeight: 300 }}>
              پاسخ به پرسش های متداول
            </ListItem>
            <ListItem sx={{ color: blueGrey[300], fontWeight: 300 }}>
              رویه های بازگرداندن کالا
            </ListItem>
            <ListItem sx={{ color: blueGrey[300], fontWeight: 300 }}>
              حریم خصوصی
            </ListItem>
          </List>
          <List>
            <ListItem sx={{ fontWeight: 700 }}>
              راهنمای خرید از دیجی‌کالا
            </ListItem>
            <ListItem sx={{ color: blueGrey[300], fontWeight: 300 }}>
              نحوه ثبت سفارش
            </ListItem>
            <ListItem sx={{ color: blueGrey[300], fontWeight: 300 }}>
              رویه ارسال سفارش
            </ListItem>
            <ListItem sx={{ color: blueGrey[300], fontWeight: 300 }}>
              شیوه پرداخت
            </ListItem>
          </List>
          <List>
            <ListItem sx={{ fontWeight: 700 }}>نماد اعتماد الکترونیک</ListItem>
            <ListItem>
              <Box sx={{ marginInline: "auto" }}>
                <img alt="e-namad" src="Images/enamad.png" width={"50px"} />
                <img alt="e-namad" src="Images/samandehi.png" width={"50px"} />
              </Box>
            </ListItem>
          </List>
          <List>
            <ListItem sx={{ fontWeight: 700 }}>
              دیجی شاپ در شبکه های اجتماعی
            </ListItem>
            <ListItem>
              <Box sx={{ marginInline: "auto" }}>
                <IconButton>
                  <InstagramIcon sx={{ color: "white", fontSize: 35 }} />
                </IconButton>
                <IconButton>
                  <WhatsAppIcon sx={{ color: "white", fontSize: 35 }} />
                </IconButton>
                <IconButton>
                  <TwitterIcon sx={{ color: "white", fontSize: 35 }} />
                </IconButton>
              </Box>
            </ListItem>
          </List>
        </Box>
        <Typography marginTop={2} textAlign={"center"}>
          تمامی حقوق این سایت محفوظ و متعلق به مجید عباسی می‌باشد.
        </Typography>
        <Typography
          textAlign={"center"}
          fontWeight={300}
          fontSize={14}
          color={blueGrey[300]}
        >
          با نمونه سازی از روی{" "}
          <a className="text-primary" href="https://digikala.com">
            دیجی کالا
          </a>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
