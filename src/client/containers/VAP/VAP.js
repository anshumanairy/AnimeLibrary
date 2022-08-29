import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { Typography } from "@mui/material";
import { getUrlSearchParams } from "../../helpers/common";

const BackgroundWrapper = styled.div`
  ${({ image }) =>
    image &&
    css`
      height: 100vh;
      background-image: url(${image});
      filter: blur(40px);
      -webkit-filter: blur(40px);
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    `}
`;

const Wrapper = styled.div`
  padding: 20px;
  margin: 0% 4%;
  position: absolute;
  top: 16%;
  background: #0d0d0db0;
  border-radius: 7px;
`;

const DetailsWrapper = styled.div`
  height: 350px;
  display: flex;
  margin: 2% 0% 0%;
  @media only screen and (max-width: 480px) {
    height: auto;
    flex-wrap: wrap;
  }
`;

const DetailsDiv = styled.div`
  margin-left: 3%;
`;

const ImageWrapper = styled.div`
  max-height: 300px;
  height: 300px;
  display: flex;
  margin: 4% 0% 0%;
`;

const DescriptionDiv = styled.div`
  margin: 4% 0% 0%;
`;

const Genre = styled(Typography)`
  border: 1px solid white;
  padding: 5px 15px;
  border-radius: 20px;
  margin-right: 10px !important;
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
    <>
      {animeData && queries.category === "title" && (
        <>
          <BackgroundWrapper image={animeData.images.jpg.large_image_url} />
          <Wrapper className="cW">
            <DetailsWrapper>
              <img src={animeData.images.jpg.large_image_url} />
              <DetailsDiv>
                <div className="dF aiB">
                  <Typography variant="h3">{`${animeData.title}`}</Typography>
                  <Typography variant="h5">{`(${animeData.year})`}</Typography>
                </div>
                <Typography variant="subtitle1">
                  {animeData.title_japanese}
                </Typography>
                <Typography>Rating: {animeData.score}</Typography>
                <Typography>Airing: {animeData.aired.string}</Typography>
                <Typography>Total Episodes: {animeData.episodes}</Typography>
                <div className="dF">
                  {animeData.genres.map((genre, index) => {
                    return (
                      <Genre className="cP" key={index}>
                        {genre.name}
                      </Genre>
                    );
                  })}
                </div>
              </DetailsDiv>
            </DetailsWrapper>
            {animeData?.trailer?.embed_url && (
              <ImageWrapper>
                <iframe
                  width="100%"
                  height="300"
                  src={`${animeData.trailer.embed_url}&autoplay=1&mute=1`}
                ></iframe>
              </ImageWrapper>
            )}
            <DescriptionDiv>
              <Typography>{animeData.background}</Typography>
              <Typography>{animeData.synopsis}</Typography>
            </DescriptionDiv>
          </Wrapper>
        </>
      )}
    </>
  );
};

export default VAP;
