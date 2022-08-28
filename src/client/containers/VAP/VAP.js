import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Typography from "@mui/joy/Typography";
import { getUrlSearchParams } from "../../helpers/common";

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
    <div className="cW">
      {animeData && queries.category === "title" && (
        <>
          <Typography>{animeData.title}</Typography>
          <Typography>{animeData.title_japanese}</Typography>
          <Typography>{animeData.year}</Typography>
          <Typography>{animeData.score}</Typography>
          <Typography>{animeData.aired.string}</Typography>
          <Typography>{animeData.episodes}</Typography>
          <div>
            {animeData.genres.map((genre, index) => {
              return <div key={index}>{genre.name}</div>;
            })}
          </div>
          <img src={animeData.images.jpg.large_image_url} />
          <iframe
            width="420"
            height="345"
            src={`${animeData.trailer.embed_url}&autoplay=1&controls=0`}
          ></iframe>
          <Typography>{animeData.background}</Typography>
          <Typography>{animeData.synopsis}</Typography>
        </>
      )}
    </div>
  );
};

export default VAP;
