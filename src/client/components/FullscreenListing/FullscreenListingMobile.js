import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ShimmerTile from "../ShimmerTile/ShimmerTile";

const FullscreenListingMobile = ({ animeData, pageType, loading, onLoadMore }) => {
  const navigate = useNavigate();
  const [visibleItems, setVisibleItems] = useState(8);

  const handleItemClick = (item) => {
    const type = pageType === "characters" ? "character" : pageType;
    navigate(`/${type}/${item.mal_id}`);
  };

  const loadMore = () => {
    setVisibleItems(prevVisibleItems => prevVisibleItems + 8);
    onLoadMore();
  };

  const renderShimmer = () => (
    <>
      {[...Array(4)].map((_, index) => (
        <div key={`shimmer-${index}`} className="w-full">
          <ShimmerTile className="w-full h-64 rounded-lg mb-2" />
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        </div>
      ))}
    </>
  );

  if (!Array.isArray(animeData)) {
    return <div>No data available</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4 pt-20">
      <h1 className="text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-500">
        {pageType.charAt(0).toUpperCase() + pageType.slice(1)}
      </h1>
      <div className="grid grid-cols-2 gap-6">
        {animeData.slice(0, visibleItems).map((item, index) => (
          <div 
            key={index} 
            onClick={() => handleItemClick(item)} 
            className="cursor-pointer transform transition-all duration-300 hover:scale-105"
          >
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              {loading ? (
                <ShimmerTile className="w-full h-64 rounded-lg" />
              ) : (
                <img
                  src={pageType === "characters" ? item.images.webp.image_url : item.images.jpg.image_url}
                  alt={item.title || item.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-sm font-semibold truncate text-white">
                  {item.title || item.name}
                </h3>
                {pageType !== "characters" && (
                  <p className="text-xs text-gray-300 mt-1">
                    {item.type} • {item.status}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
        {loading && animeData.length === 0 && renderShimmer()}
      </div>
      {visibleItems < animeData.length && (
        <div className="text-center mt-8">
          <button 
            onClick={loadMore}
            className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default FullscreenListingMobile;