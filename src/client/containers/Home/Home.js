import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FullscreenListing from "../../components/FullscreenListing/FullscreenListing";
import PageTransition from "../../components/PageTransition/PageTransition";
import Header from "../../components/Header/Header";

const Home = () => {
  const { type = "anime" } = useParams();
  const navigate = useNavigate();

  const [animeData, setAnimeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const getSearchData = async (currentPage, query = "") => {
    setLoading(true);
    try {
      let url = `https://api.jikan.moe/v4/${type}?page=${currentPage}&limit=24`;
      if (query) {
        url += `&q=${encodeURIComponent(query)}`;
      }
      let response = await fetch(url);
      let data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return { data: [] };
    } finally {
      setLoading(false);
    }
  };

  const resetState = useCallback(() => {
    setAnimeData([]);
    setPage(1);
    setSearchTerm("");
    setLoading(false);
  }, []);

  useEffect(() => {
    resetState();
    getSearchData(1).then((allAnimeData) => {
      setAnimeData(allAnimeData.data || []);
    });
  }, [type, resetState]);

  const handleLoadMore = useCallback(() => {
    if (!loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      getSearchData(nextPage, searchTerm).then((allAnimeData) => {
        setAnimeData((prevData) => [...prevData, ...(allAnimeData.data || [])]);
      });
    }
  }, [loading, page, type, searchTerm]);

  const handleSearch = useCallback((query) => {
    setSearchTerm(query);
    setPage(1);
    setAnimeData([]);
    getSearchData(1, query).then((allAnimeData) => {
      setAnimeData(allAnimeData.data || []);
    });
  }, [type]);

  return (
    <PageTransition loading={loading}>
      <Header onSearch={handleSearch} pageType={type} searchTerm={searchTerm} />
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
