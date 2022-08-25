import React, { useState, useEffect } from "react";

import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./client/styles/GlobalStyle";
import Routes from "./client/components/Routes";
import Themes from "./client/styles/theme";
import Header from "./client/components/Header/Header";

function App() {
  const [type, setType] = useState("anime");

  return (
    <ThemeProvider theme={Themes}>
      <BrowserRouter>
        <GlobalStyle />
        <Header type={type} setType={setType} />
        <Routes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
