import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

const HomePage = React.lazy(() => import("../containers/Home"));
const VapPage = React.lazy(() => import("../containers/VAP"));

const AppRoutes = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:type(title|manga|characters)" element={<VapPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </React.Suspense>
  );
};

export default AppRoutes;
