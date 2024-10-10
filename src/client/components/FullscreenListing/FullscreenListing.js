import React from "react";
import FullscreenListingDesktop from "./FullscreenListingDesktop";
import FullscreenListingMobile from "./FullscreenListingMobile";
import { isMobile } from "../../helpers/deviceDetector";

const FullscreenListing = (props) => {
  return isMobile() ? <FullscreenListingMobile {...props} /> : <FullscreenListingDesktop {...props} />;
};

export default FullscreenListing;