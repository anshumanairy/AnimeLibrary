import React from "react";

import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Routes from "./client/components/Routes";
import Themes from "./client/styles/theme";
import Header from "./client/components/Header/Header";
import "./client/styles/GlobalStyle/global.css";

function App() {
  return (
    <ThemeProvider theme={Themes}>
      <BrowserRouter>
        <Header />
        <Routes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
