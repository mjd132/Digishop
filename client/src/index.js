import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import {
  GlobalStyles,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material";
import { grey } from "@mui/material/colors";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const theme = createTheme({
  components: {
    MuiListItemText: {
      styleOverrides: {
        primary: {
          textAlign: "right",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: grey[500],
          "&:after": {
            borderColor: grey[500],
          },
          "&:before": {
            borderColor: grey[500],
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          textAlign: "right",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: "white",
        },
        body: { textAlign: "right" },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          "& .Mui-disabled": {
            "-webkit-text-fill-color": "rgba(200, 200, 200, 0.5)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        filled: {
          "&:not(.Mui-focused)": {
            transform: "translate(12px, 13px) scale(1)",
          },
        },
        root: {
          direction: "rtl",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#ffffff7f",
              textAlign: "right",
            },
            "&:hover fieldset": {
              borderColor: "#ffffffbb",
              textAlign: "right",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#ffffffaa",
              textAlign: "right",
            },
          },
          "& label": {
            transformOrigin: "right !important",
            left: "inherit !important",
            right: "1.75rem !important",
            top: "-0.6rem",
            color: "#ffffff7f",
          },
          "& legend": {
            height: "10px",
          },

          "& .MuiInputLabel-root.Mui-focused": {
            color: "#ffffffcc",
            transform: "translate(14px, -2px) scale(0.75)",
          },
          "& .MuiInputLabel-root.MuiFormLabel-filled": {
            transform: "translate(14px, -2px) scale(0.75)",
          },
          "& .MuiInputBase-input": {
            padding: "8px",
            color: "white",
          },
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          color: grey[100],
          padding: "8px",
          borderColor: grey[500],
        },
      },
    },
  },
  typography: {
    fontFamily: ['"Vazirmatn RD FD"', "sans-serif"].join(","),
  },
});
const themeR = responsiveFontSizes(theme);

root.render(
  <>
    <GlobalStyles
      styles={{
        body: {
          fontFamily: "Vazirmatn RD FD",
          backgroundColor: grey[900],
          color: grey[100],
        },
        "&::-webkit-scrollbar": {
          width: "8px",
          height: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          width: "8px",
          height: "8px",
          backgroundColor: grey[500],
        },
        "&::-webkit-scrollbar-track": { backgroundColor: grey[800] },
      }}
    />
    <ThemeProvider theme={themeR}>
      <App />
    </ThemeProvider>
  </>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
