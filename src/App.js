import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import RaffleHome from "./pages/RaffleHome";
import RaffleDashboard from "./pages/RaffleDashboard";
import RaffleWinner from "./pages/RaffleWinner";
import { LanguageProvider } from "./context/LanguageContext";
import { AudioProvider } from "./context/AudioContext.js";

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

function App() {
  return (
    <LanguageProvider>
      <AudioProvider>
        <AppRoutes />
      </AudioProvider>
    </LanguageProvider>
  );
}

export default App;
