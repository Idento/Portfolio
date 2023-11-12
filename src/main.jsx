import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from "../redux.js";
import "./styles/index.css";
import SinglePageApp from "./components/SinglePageApp/SinglePageApp.jsx";
import { grey } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      light: grey[50],
      main: '#424242',
      dark: grey[900],
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 700,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  }
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Routes>
          <Route path="/" element={<App />} />
          <Route path="/main" element={<SinglePageApp />} />
        </Routes>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
