import React from "react";
import HeaderDesktop from "./HeaderDesktop";
import HeaderMobile from "./HeaderMobile";
import { isMobile } from "../../helpers/deviceDetector";

const Header = ({ onSearch, pageType }) => {
  return isMobile() ? (
    <HeaderMobile />
  ) : (
    <HeaderDesktop onSearch={onSearch} pageType={pageType} />
  );
};

export default Header;
