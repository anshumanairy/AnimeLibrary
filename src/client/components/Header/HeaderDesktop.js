import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Categories } from "../../constants/common";

const HeaderDesktop = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (type) => {
    navigate(`/${type}`, { state: { loading: true } });
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-b from-black/70 to-transparent z-50">
      <div className="container mt-[1rem] mx-auto max-w-[88vw] py-2 flex justify-between items-center">
        <h1
          onClick={() => handleClick("anime")}
          className="text-white text-2xl font-bold hover:text-red-500 transition-colors duration-300 cursor-pointer"
        >
          AnimeDB
        </h1>
        <nav>
          {Categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleClick(category.key)}
              className={`text-white hover:text-red-500 ml-4 transition-colors duration-300 ${
                location.pathname.includes(category.key) ? "text-red-500" : ""
              }`}
            >
              {category.value}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default HeaderDesktop;
