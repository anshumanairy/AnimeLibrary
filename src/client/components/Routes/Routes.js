import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

const HomePage = React.lazy(() => import("../../containers/Home"));
const VapPage = React.lazy(() => import("../../containers/VAP"));

const AppRoutes = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Navigate to="/anime" replace />} />
        <Route path="/:type/:id" element={<VapPage />} />
        <Route path="/:type" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </React.Suspense>
  );
};

export default AppRoutes;
