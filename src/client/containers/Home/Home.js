import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import FullscreenListing from "../../components/FullscreenListing/FullscreenListing";
import PageTransition from "../../components/PageTransition/PageTransition";

const Home = () => {
  const { type = "anime" } = useParams();

  const [animeData, setAnimeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const getSearchData = async (currentPage) => {
    setLoading(true);
    try {
      let response = await fetch(
        `https://api.jikan.moe/v4/${type}?page=${currentPage}&limit=24`
      );
      let data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return { data: [] };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setAnimeData([]);
    setPage(1);
    getSearchData(1).then((allAnimeData) => {
      setAnimeData(allAnimeData.data || []);
    });
  }, [type]);

  const handleLoadMore = useCallback(() => {
    if (!loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      getSearchData(nextPage).then((allAnimeData) => {
        setAnimeData((prevData) => [...prevData, ...(allAnimeData.data || [])]);
      });
    }
  }, [loading, page, type]);

  return (
    <PageTransition loading={loading}>
      <div className="h-screen w-screen relative">
        <FullscreenListing
          animeData={animeData}
          pageType={type}
          loading={loading}
          onLoadMore={handleLoadMore}
        />
      </div>
    </PageTransition>
  );
};

export default Home;
