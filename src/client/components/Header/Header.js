import React, { useEffect } from "react";
import styled from "styled-components";
import { Categories } from "../../constants/common";

const Wrapper = styled.div`
  @import url("https://fonts.googleapis.com/css?family=Raleway");
  font-family: Raleway;
  border-bottom: 1px solid white;
  width: 100%;
  padding: 2.5% 0px;
  color: white;
  margin-bottom: 5%;
`;

const HeaderItems = styled.div`
  margin-right: 5%;
`;

const HeaderElements = styled.div`
  padding: 0px 20px;
`;

const Header = () => {
  const handleClick = (type) => {
    const url = new URL(window.location);
    url.pathname = "/";
    url.searchParams.set("pageType", type);
    url.searchParams.delete("q");
    url.searchParams.delete("id");
    window.location.href = url;
  };

  return (
    <Wrapper className="dFA jcFE">
      <HeaderItems className="dF">
        {Categories.map((category, index) => {
          return (
            <HeaderElements
              className="cP"
              key={index}
              onClick={() => handleClick(category.key)}
            >
              {category.value}
            </HeaderElements>
          );
        })}
      </HeaderItems>
    </Wrapper>
  );
};

export default Header;
