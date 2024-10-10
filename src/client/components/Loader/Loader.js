import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-30 backdrop-blur-sm">
      <div className="relative flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-red-500"></div>
        <span className="absolute text-white text-lg font-bold">AnimeDB</span>
      </div>
    </div>
  );
};

export default Loader;
