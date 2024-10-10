import React from "react";
import HeaderDesktop from "./HeaderDesktop";
import HeaderMobile from "./HeaderMobile";
import { isMobile } from "../../helpers/deviceDetector";

const Header = () => {
  return isMobile() ? <HeaderMobile /> : <HeaderDesktop />;
};

export default Header;
