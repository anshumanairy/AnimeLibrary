import React, { useState, useEffect } from "react";
import styled from "styled-components";
import InputBase from "@mui/material/InputBase";
import loadable from "@loadable/component";
import { QueryTypesMapping } from "../../constants/common";
import { getUrlSearchParams } from "../../helpers/common";

const ListingPage = loadable(() => import("../Listing"));

const Wrapper = styled.div`
  width: 100vw;
  padding: 0% 0px 5% 0px;
`;

const Search = styled.div`
  position: relative;
  width: 30%;
  border-radius: 4px;
  background-color: lightgray;
  margin-right: 16px;
`;

const StyledInputBase = styled(InputBase)`
  padding: 10px 20px;
`;

const Home = () => {
  let url = new URL(window.location);

  const [animeData, setAnimeData] = useState();
  const [queries, setQueries] = useState({});

  const getSearchData = async (query) => {
    let data = await fetch(
      `https://api.jikan.moe/v4/${queries.pageType}?${query}`
    );
    return data.json();
  };

  const handleData = async () => {
    let finalQuery = "";
    Object.keys(queries).map((query) => {
      if (query !== "pageType") {
        finalQuery += `${QueryTypesMapping[query]}=${queries[query]}`;
        url.searchParams.set(QueryTypesMapping[query], queries[query]);
      }
    });
    history.pushState({}, "", url);
    let allAnimeData = await getSearchData(finalQuery);
    setAnimeData(allAnimeData.data);
  };

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      setQueries({
        ...queries,
        search: event.target.value,
      });
    }
  };

  useEffect(async () => {
    if (queries.pageType) {
      handleData();
    }
  }, [queries]);

  useEffect(() => {
    let search = getUrlSearchParams(url.search);
    let finalQueryObject = {};
    Object.keys(search).map((key) => {
      let finalKey = Object.keys(QueryTypesMapping).find(
        (subkey) => QueryTypesMapping[subkey] === key
      );
      let finalValue = search[key];
      finalQueryObject[finalKey] = finalValue;
    });
    setQueries({ ...finalQueryObject });
  }, []);

  return (
    <Wrapper className="dFA jcC fdC">
      <Search>
        <StyledInputBase
          onKeyDown={handleSearch}
          color="secondary"
          placeholder={"Search"}
        />
      </Search>
      <ListingPage animeData={animeData} pageType={queries.pageType} />
    </Wrapper>
  );
};

export default Home;
