import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import RaffleHome from "./pages/RaffleHome";
import RaffleDashboard from "./pages/RaffleDashboard";
import RaffleWinner from "./pages/RaffleWinner";


function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RaffleHome />} />
        <Route path="/dashboard" element={<RaffleDashboard />} />
        <Route path="/winner" element={<RaffleWinner />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
