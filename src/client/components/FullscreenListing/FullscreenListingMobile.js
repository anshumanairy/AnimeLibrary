import React from "react";
import { useNavigate } from "react-router-dom";
import ShimmerTile from "../ShimmerTile/ShimmerTile";

const FullscreenListingMobile = ({ animeData, pageType, loading, onLoadMore }) => {
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    const type = pageType === "characters" ? "character" : pageType;
    navigate(`/${type}/${item.mal_id}`);
  };

  const renderShimmer = () => (
    <>
      {[...Array(6)].map((_, index) => (
        <div key={`shimmer-${index}`} className="w-full">
          <ShimmerTile className="w-full h-48 rounded-lg mb-2" />
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        </div>
      ))}
    </>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 pt-16">
      <h1 className="text-3xl font-bold mb-4">{pageType.charAt(0).toUpperCase() + pageType.slice(1)}</h1>
      <div className="grid grid-cols-2 gap-4">
        {animeData.map((item, index) => (
          <div key={index} onClick={() => handleItemClick(item)} className="cursor-pointer">
            {loading ? (
              <ShimmerTile className="w-full h-48 rounded-lg mb-2" />
            ) : (
              <img
                src={pageType === "characters" ? item.images.webp.image_url : item.images.jpg.image_url}
                alt={item.title || item.name}
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
            )}
            {loading ? (
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            ) : (
              <p className="text-sm font-semibold truncate">{item.title || item.name}</p>
            )}
          </div>
        ))}
        {loading && animeData.length === 0 && renderShimmer()}
      </div>
    </div>
  );
};

export default FullscreenListingMobile;