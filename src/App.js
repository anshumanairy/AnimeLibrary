import React, { useState } from "react";

import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Routes from "./client/components/Routes";
import Themes from "./client/styles/theme";
import Header from "./client/components/Header/Header";
import "./client/styles/GlobalStyle/global.css";

function App() {
  const [type, setType] = useState("anime");

  return (
    <ThemeProvider theme={Themes}>
      <BrowserRouter>
        <Header type={type} setType={setType} />
        <Routes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
