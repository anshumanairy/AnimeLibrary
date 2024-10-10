import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Categories } from "../../constants/common";

const HeaderMobile = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (type) => {
    navigate(`/${type}`, { state: { loading: true } });
    setMenuOpen(false);
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [menuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 bg-black z-50 max-w-[100vw]">
      <div className="flex justify-between items-center p-4">
        <h1
          onClick={() => handleClick("anime")}
          className="text-white text-xl font-bold"
        >
          AnimeDB
        </h1>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white z-50 relative"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>
      {menuOpen && (
        <nav className="fixed top-0 left-0 right-0 bottom-0 bg-black p-4 pt-16 z-40">
          {Categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleClick(category.key)}
              className={`block w-full text-left text-white py-2 ${
                location.pathname.includes(category.key) ? 'text-red-500' : ''
              }`}
            >
              {category.value}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
};

export default HeaderMobile;