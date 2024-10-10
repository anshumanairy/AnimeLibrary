import React from "react";
import { useNavigate } from "react-router-dom";
import {
  MANGA_FIELDS,
  ANIME_FIELDS,
  CHARACTER_FIELDS,
} from "../../constants/vapFields";

const VAPMobile = ({ data, type }) => {
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
            <h3 className="text-xl font-bold mb-2">Trailer</h3>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={data.trailer.embed_url}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        ) : null;
      case "genres":
      case "themes":
      case "demographics":
        return data[field] && data[field].length > 0 ? (
          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </h3>
            <div className="flex flex-wrap gap-2">
              {data[field].map((item, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-700 rounded-full text-xs"
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
            <h3 className="text-lg font-bold mb-2">
              Related {type.charAt(0).toUpperCase() + type.slice(1)}
            </h3>
            {data[field].map((relation, index) => (
              <div key={index} className="mb-2">
                <h4 className="font-bold text-sm">{relation.relation}</h4>
                {relation.entry.map((entry, entryIndex) => (
                  <a
                    key={entryIndex}
                    href={entry.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 block text-sm"
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
            <h3 className="text-lg font-bold mb-2">
              {field.replace("_", " ").charAt(0).toUpperCase() +
                field.replace("_", " ").slice(1)}
            </h3>
            <p className="text-sm">
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4 pt-20">
      <div className="max-w-lg mx-auto">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={data.title || data.name}
            className="w-full rounded-lg shadow-2xl mb-6"
          />
        )}
        <h1 className="text-3xl font-bold mb-4">{data.title || data.name}</h1>
        <div
          className="space-y-6 max-w-[96vw]"
          style={{ overflowWrap: "break-word" }}
        >
          {fields.map((field) => renderField(field))}
        </div>
      </div>
    </div>
  );
};

export default VAPMobile;
