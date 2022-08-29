import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Typography } from "@mui/material";
import { getUrlSearchParams } from "../../helpers/common";

const Wrapper = styled.div`
  padding: 0% 3%;
`;

const ImageWrapper = styled.div`
  max-height: 300px;
  height: 300px;
  display: flex;
  margin: 10% 0%;
`;

const VAP = () => {
  const [animeData, setAnimeData] = useState();
  const [queries, setQueries] = useState({});

  const getSearchData = async () => {
    let data = await fetch(`https://api.jikan.moe/v4/anime/${queries.id}/full`);
    return data.json();
  };

  useEffect(() => {
    let url = new URL(window.location);
    let params = getUrlSearchParams(url.search);
    setQueries({
      category: url.pathname.split(["/"])[1],
      ...params,
    });
  }, []);

  useEffect(async () => {
    if (queries.category && queries.id) {
      let allAnimeData = await getSearchData();
      setAnimeData(allAnimeData.data);
      console.log(allAnimeData.data);
    }
  }, [queries]);

  return (
    <Wrapper className="cW">
      {animeData && queries.category === "title" && (
        <>
          <div className="dF aiB">
            <Typography variant="h3">{`${animeData.title}`}</Typography>
            <Typography variant="h5">{`(${animeData.year})`}</Typography>
          </div>
          <Typography variant="subtitle1">
            {animeData.title_japanese}
          </Typography>
          <Typography>Rating: {animeData.score}</Typography>
          <Typography>Airing: {animeData.aired.string}</Typography>
          <Typography>Total Episode: {animeData.episodes}</Typography>
          <div className="dF">
            {animeData.genres.map((genre, index) => {
              return <div key={index}>{genre.name}</div>;
            })}
          </div>
          <ImageWrapper>
            <img src={animeData.images.jpg.large_image_url} />
            <iframe
              width="100%"
              height="300"
              src={`${animeData.trailer.embed_url}&autoplay=1&mute=1`}
            ></iframe>
          </ImageWrapper>
          <Typography>{animeData.background}</Typography>
          <Typography>{animeData.synopsis}</Typography>
        </>
      )}
    </Wrapper>
  );
};

export default VAP;
