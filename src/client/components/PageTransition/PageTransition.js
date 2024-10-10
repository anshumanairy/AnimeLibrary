import React from 'react';
import Loader from '../Loader/Loader';

const PageTransition = ({ loading, children }) => {
  return (
    <div className="relative">
      {children}
      {loading && (
        <div className="absolute inset-0 z-50">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default PageTransition;