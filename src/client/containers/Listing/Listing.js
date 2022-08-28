import React from "react";
import styled from "styled-components";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";

const AnimeData = styled.div`
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  padding: 7%;
  @media only screen and (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    padding: 4%;
  }
`;

const CardDiv = styled(Card)`
  min-height: 250px;
  aspect-ratio: 1/1;
  @media only screen and (max-width: 480px) {
    min-height: 180px;
  }
`;

const Listing = (props) => {
  const { animeData, pageType } = props;

  const handleCardClick = (data) => {
    let query = `?pageType=vap&id=${data.mal_id}`;
    window.location.href = `/${
      pageType === "characters"
        ? "character"
        : pageType === "manga"
        ? "manga"
        : "title"
    }${query}`;
  };

  return (
    <AnimeData className="dG w100">
      {animeData &&
        animeData.map((data, index) => {
          return (
            <CardDiv
              className="cP"
              key={index}
              onClick={() => handleCardClick(data)}
            >
              <CardCover>
                <img
                  src={
                    pageType === "characters"
                      ? data.images.jpg.image_url
                      : data.images.jpg.large_image_url
                  }
                  alt=""
                />
              </CardCover>
              <CardCover
                sx={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
                }}
              />
              <CardContent sx={{ justifyContent: "flex-end" }}>
                <Typography
                  className="wsN Ell"
                  level="h2"
                  fontSize="1rem"
                  textColor="#fff"
                  mb={1}
                >
                  {pageType === "characters" ? data.name : data.title}
                </Typography>
                <Typography
                  className="wsN Ell"
                  textColor="neutral.300"
                  fontSize="0.8rem"
                >
                  {pageType === "characters"
                    ? data.name_kanji
                    : data.title_japanese}
                </Typography>
              </CardContent>
            </CardDiv>
          );
        })}
    </AnimeData>
  );
};

export default Listing;
