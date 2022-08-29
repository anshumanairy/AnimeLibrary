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

const SeeMoreDiv = styled.button`
  color: white;
  border: 1px solid white;
  padding: 13px 20px;
  border-radius: 25px;
  width: 30%;
  text-align: center;
  background: none;
`;

const Home = () => {
  let url = new URL(window.location);
  let search = getUrlSearchParams(url.search);

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
    Object.keys(queries).map((query, index) => {
      if (query !== "pageType") {
        finalQuery += `${index > 0 ? "&" : ""}${QueryTypesMapping[query]}=${
          queries[query]
        }`;
        url.searchParams.set(QueryTypesMapping[query], queries[query]);
      }
    });

    let allAnimeData = await getSearchData(finalQuery);

    setAnimeData(
      search.page &&
        queries["page"] &&
        parseInt(search.page) !== parseInt(queries["page"])
        ? { ...allAnimeData, data: [...animeData.data, ...allAnimeData.data] }
        : { ...allAnimeData }
    );

    history.pushState({}, "", url);
  };

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      setQueries({
        ...queries,
        search: event.target.value,
        page: 1,
      });
    }
  };

  useEffect(async () => {
    if (queries.pageType) {
      handleData();
    }
  }, [queries]);

  useEffect(() => {
    let finalQueryObject = {};
    Object.keys(search).map((key) => {
      let finalKey = Object.keys(QueryTypesMapping).find(
        (subkey) => QueryTypesMapping[subkey] === key
      );
      let finalValue = search[key];
      finalQueryObject[finalKey] = finalValue;
    });
    finalQueryObject["page"] = search["page"] || 1;
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
      {animeData?.data && (
        <ListingPage animeData={animeData.data} pageType={queries.pageType} />
      )}
      {animeData?.pagination?.has_next_page && (
        <SeeMoreDiv
          onClick={() =>
            setQueries({
              ...queries,
              page: parseInt(queries.page) + 1,
            })
          }
        >
          See More
        </SeeMoreDiv>
      )}
    </Wrapper>
  );
};

export default Home;
