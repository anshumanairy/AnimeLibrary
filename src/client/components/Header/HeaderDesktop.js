import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Categories } from "../../constants/common";
import SearchIcon from "@mui/icons-material/Search";

const HeaderDesktop = ({ onSearch, pageType, searchTerm }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || "");

  useEffect(() => {
    setLocalSearchTerm("");
  }, [pageType]);

  const handleClick = (type) => {
    navigate(`/${type}`);
    setLocalSearchTerm("");
    onSearch("");
  };

  const debouncedSearch = useCallback(
    debounce((value) => {
      onSearch(value);
    }, 500),
    [onSearch]
  );

  useEffect(() => {
    debouncedSearch(localSearchTerm);
  }, [localSearchTerm, debouncedSearch]);

  const handleSearchChange = (e) => {
    setLocalSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(localSearchTerm);
  };

  const getPlaceholder = () => {
    switch (pageType) {
      case "anime":
        return "Search Anime";
      case "manga":
        return "Search Manga";
      case "characters":
        return "Search Characters";
      default:
        return "Search...";
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-b from-black/70 to-transparent z-50">
      <div className="mt-[1rem] mx-auto px-[4rem] py-2 flex justify-between items-center">
        <nav className="flex items-center">
          <h1
            onClick={() => handleClick("anime")}
            className="text-white text-2xl font-bold hover:text-red-500 transition-colors duration-300 cursor-pointer"
          >
            AnimeDB
          </h1>
          <div className="ml-8">
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
          </div>
        </nav>

        <div>
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={localSearchTerm}
              onChange={handleSearchChange}
              placeholder={getPlaceholder()}
              className="w-[20vw] bg-white/10 text-white placeholder-white/50 rounded-full py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-red-500 transition-colors duration-300"
            >
              <SearchIcon />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default HeaderDesktop;
