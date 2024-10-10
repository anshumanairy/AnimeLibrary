import React from "react";
import VAPDesktop from "./VAPDesktop";
import VAPMobile from "./VAPMobile";
import { isMobile } from "../../helpers/deviceDetector";

const VAP = () => {
  return isMobile() ? <VAPMobile /> : <VAPDesktop />;
};

export default VAP;