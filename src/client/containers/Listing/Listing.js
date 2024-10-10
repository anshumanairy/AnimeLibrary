import React from "react";
import { styled } from "@mui/material/styles";
import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const StyledCard = styled(Card)(({ theme }) => ({
  position: "relative",
  height: 0,
  paddingTop: "150%", // 2:3 aspect ratio
  overflow: "hidden",
  "&:hover": {
    "& .MuiCardMedia-root": {
      transform: "scale(1.1)",
    },
    "& .MuiCardContent-root": {
      opacity: 1,
    },
  },
}));

const CardMediaStyled = styled(CardMedia)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  transition: "transform 0.3s ease-in-out",
});

const CardContentStyled = styled(CardContent)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))",
  opacity: 0,
  transition: "opacity 0.3s ease-in-out",
  padding: theme.spacing(2),
}));

const Listing = ({ animeData, pageType }) => {
  const navigate = useNavigate();

  const handleCardClick = (data) => {
    const url = `/${pageType}/${data.mal_id}`;
    console.log("Navigating to:", url); // Add this line
    navigate(url);
  };

  return (
    <Grid container spacing={2}>
      {animeData &&
        animeData.map((data, index) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
            <StyledCard onClick={() => handleCardClick(data)}>
              <CardMediaStyled
                image={
                  pageType === "characters"
                    ? data.images.jpg.image_url
                    : data.images.jpg.large_image_url
                }
                title={pageType === "characters" ? data.name : data.title}
              />
              <CardContentStyled>
                <Typography
                  variant="subtitle1"
                  component="div"
                  noWrap
                  sx={{ color: "white" }}
                >
                  {pageType === "characters" ? data.name : data.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255,255,255,0.7)" }}
                  noWrap
                >
                  {pageType === "characters"
                    ? data.name_kanji
                    : data.title_japanese}
                </Typography>
              </CardContentStyled>
            </StyledCard>
          </Grid>
        ))}
    </Grid>
  );
};

export default Listing;
