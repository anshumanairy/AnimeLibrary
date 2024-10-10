import React from "react";
import { useNavigate } from "react-router-dom";
import {
  MANGA_FIELDS,
  ANIME_FIELDS,
  CHARACTER_FIELDS,
} from "../../constants/vapFields";

const VAPDesktop = ({ data, type }) => {
  const navigate = useNavigate();

  if (!data) return null;

  const fields =
    type === "characters"
      ? CHARACTER_FIELDS
      : type === "anime"
      ? ANIME_FIELDS
      : MANGA_FIELDS;

  const renderField = (field) => {
    if (!data.hasOwnProperty(field)) return null;
    if (field === "images") return null; // Skip rendering images field separately

    switch (field) {
      case "trailer":
        return data.trailer?.embed_url ? (
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-4">Trailer</h3>
            <iframe
              width="560"
              height="315"
              src={data.trailer.embed_url}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : null;
      case "genres":
      case "themes":
      case "demographics":
        return data[field] && data[field].length > 0 ? (
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </h3>
            <div className="flex flex-wrap gap-2">
              {data[field].map((item, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-700 rounded-full text-sm"
                >
                  {item.name}
                </span>
              ))}
            </div>
          </div>
        ) : null;
      case "relations":
        return data[field] && data[field].length > 0 ? (
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-4">
              Related {type.charAt(0).toUpperCase() + type.slice(1)}
            </h3>
            {data[field].map((relation, index) => (
              <div key={index} className="mb-2">
                <h4 className="font-bold">{relation.relation}</h4>
                {relation.entry.map((entry, entryIndex) => (
                  <a
                    key={entryIndex}
                    href={entry.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 block"
                  >
                    {entry.name}
                  </a>
                ))}
              </div>
            ))}
          </div>
        ) : null;
      default:
        return data[field] ? (
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">
              {field.replace("_", " ").charAt(0).toUpperCase() +
                field.replace("_", " ").slice(1)}
            </h3>
            <p>
              {typeof data[field] === "object"
                ? JSON.stringify(data[field])
                : data[field]}
            </p>
          </div>
        ) : null;
    }
  };

  const imageUrl = data.images?.webp?.image_url || data.images?.jpg?.image_url;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8 pt-24">
      {" "}
      {/* Added pt-24 for top padding */}
      <div className="max-w-[88vw] mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {imageUrl && (
            <div className="md:w-1/3">
              <img
                src={imageUrl}
                alt={data.title || data.name}
                className="w-full rounded-lg shadow-2xl mb-6"
              />
            </div>
          )}
          <div className={`${imageUrl ? "md:w-2/3" : "w-full"}`}>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              {data.title || data.name}
            </h1>
            <div
              className="grid grid-cols-1 gap-8"
              style={{ overflowWrap: "break-word" }}
            >
              {fields.map((field) => renderField(field))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VAPDesktop;
