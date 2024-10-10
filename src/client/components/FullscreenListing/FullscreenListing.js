import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ShimmerTile from "../ShimmerTile/ShimmerTile";

const TileImage = ({ data, pageType, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div
      className="relative w-[220px] h-[330px] mr-6 rounded-lg cursor-pointer transition-all duration-300 overflow-hidden flex-shrink-0 group"
      onClick={onClick}
    >
      {!imageLoaded && <ShimmerTile />}
      <img
        src={pageType === "characters" ? data.images.webp.image_url : data.images.jpg.image_url}
        alt={data.title || data.name}
        className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={handleImageLoad}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
      <div className="absolute inset-0 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-lg font-semibold mb-2">{data.title || data.name}</h3>
      </div>
    </div>
  );
};

const LoadingIndicator = () => (
  <div className="flex items-center justify-center w-[220px] h-[330px]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
  </div>
);

const FullscreenListing = ({ animeData, pageType, loading, onLoadMore }) => {
  const [backgroundImage, setBackgroundImage] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const navigate = useNavigate();
  const tilesRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    if (animeData && animeData.length > 0) {
      const firstItem = animeData[0];
      setBackgroundImage(pageType === "characters" ? firstItem.images.webp.image_url : firstItem.images.jpg.large_image_url);
      setSelectedTitle(firstItem.title || firstItem.name);
      setSelectedDescription(firstItem.synopsis || firstItem.about || "No description available.");
      setSelectedId(firstItem.mal_id);
    }
  }, [animeData, pageType]);

  useEffect(() => {
    if (tilesRef.current) {
      tilesRef.current.scrollLeft = 0;
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (tilesRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = tilesRef.current;
        // Load more when we're 80% through the scroll
        if (scrollWidth - (scrollLeft + clientWidth) < clientWidth * 0.2) {
          onLoadMore();
        }
      }
    };

    const tilesElement = tilesRef.current;
    if (tilesElement) {
      tilesElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (tilesElement) {
        tilesElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [onLoadMore]);

  const handleImageClick = (data, index) => {
    const newBackgroundImage = pageType === "characters"
      ? data.images.webp.image_url
      : data.images.jpg.large_image_url;

    setBackgroundImage(newBackgroundImage);
    setSelectedTitle(data.title || data.name);
    setSelectedDescription(data.synopsis || data.about || "No description available.");
    setSelectedId(data.mal_id);

    if (tilesRef.current) {
      const tileWidth = 220 + 24; // Image width (220px) + margin (1.5rem)
      tilesRef.current.scrollTo({
        left: index * tileWidth,
        behavior: "smooth",
      });
    }
  };

  const handleViewClick = () => {
    const type = pageType === "characters" ? "character" : pageType;
    navigate(`/${type}/${selectedId}`);
  };

  return (
    <div className="h-screen w-screen relative overflow-hidden font-sans">
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.4) 100%), url(${backgroundImage})`,
        }}
      />
      <div className="relative z-10 h-full w-full flex items-center justify-start p-4">
        <div className="max-w-[35%] absolute left-4 top-[60%] transform -translate-y-1/2 animate-fadeIn">
          <h1 className="text-white text-[5rem] mb-2 text-shadow font-light ml-[3rem] transition-all duration-300 ease-in-out leading-tight">
            {selectedTitle}
          </h1>
          <div className="ml-[3rem] mt-2">
            <p className="text-white text-sm overflow-hidden max-h-[4.5em] max-w-[40vw] transition-all duration-300 ease-in-out">
              {selectedDescription}
            </p>
          </div>
          <button
            onClick={handleViewClick}
            className="ml-[3rem] mt-4 bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            View Details
          </button>
        </div>
        <div className="absolute left-[40%] right-0 top-[48%] overflow-hidden">
          <div
            className="flex overflow-x-scroll overflow-y-hidden px-2 py-4 animate-slideIn hide-scrollbar"
            ref={tilesRef}
          >
            {animeData.map((data, index) => (
              <TileImage
                key={index}
                data={data}
                pageType={pageType}
                onClick={() => handleImageClick(data, index)}
              />
            ))}
            {loading && <LoadingIndicator />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullscreenListing;