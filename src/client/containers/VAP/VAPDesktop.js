import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

const VAPDesktop = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const { type, id } = useParams();

  console.log("VAP params:", { type, id });

  const getSearchData = async () => {
    setLoading(true);
    try {
      let response = await fetch(`https://api.jikan.moe/v4/${type}/${id}/full`);
      return await response.json();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSearchData().then((result) => {
      console.log("API response:", result);
      setData(result.data);
    });
  }, [type, id]);

  if (loading) return <Loader />;
  if (!data) return null;

  const isCharacter = type === "character";

  return (
    <div className="min-h-screen bg-cover bg-center" style={{backgroundImage: `linear-gradient(to bottom, rgba(20,20,20,0.5), rgba(20,20,20,1)), url(${isCharacter ? data.images.jpg.image_url : data.images.jpg.large_image_url})`}}>
      <div className="container mx-auto px-4 pt-20 text-white">
        <h1 className="text-4xl font-bold mb-2">{isCharacter ? data.name : data.title}</h1>
        <h2 className="text-2xl mb-4">{isCharacter ? data.name_kanji : data.title_japanese}</h2>
        {!isCharacter && data.genres && (
          <div className="flex flex-wrap gap-2 mb-4">
            {data.genres.map((genre, index) => (
              <span key={index} className="px-2 py-1 bg-red-500 rounded-full text-sm">{genre.name}</span>
            ))}
          </div>
        )}
        <div className="flex flex-col md:flex-row gap-8">
          <img src={isCharacter ? data.images.jpg.image_url : data.images.jpg.large_image_url} alt={isCharacter ? data.name : data.title} className="w-64 h-auto rounded-lg shadow-lg" />
          <div>
            <p className="mb-4">{isCharacter ? data.about : data.synopsis}</p>
            {!isCharacter && (
              <p className="mb-4">Rating: {data.score} | Episodes: {data.episodes} | Aired: {data.aired?.string}</p>
            )}
            {!isCharacter && data?.trailer?.embed_url && (
              <a href={data.trailer.embed_url} target="_blank" rel="noopener noreferrer" className="inline-block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300">
                Watch Trailer
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VAPDesktop;