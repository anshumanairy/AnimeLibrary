import React, { useState, useEffect } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Routes from "./client/components/Routes/Routes";
import theme from "./client/styles/theme";
import Header from "./client/components/Header/Header";
import PageTransition from "./client/components/PageTransition/PageTransition";
import "./client/styles/GlobalStyle/global.css";
import "./client/styles/tailwind.css";

function AppContent() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.loading) {
      setLoading(true);
      // Simulate a delay to show the loading effect
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <PageTransition loading={loading}>
      <Header />
      <Routes />
    </PageTransition>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
