import React from 'react';

const ShimmerTile = () => {
  return (
    <div className="relative w-[220px] h-[330px] mr-6 rounded-lg overflow-hidden flex-shrink-0 bg-gray-800 animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700 to-transparent shimmer"></div>
    </div>
  );
};

export default ShimmerTile;