import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import GamesHome from "./pages/GamesHome";
import Game1 from "./pages/Game1";
import Game2 from "./pages/Game2";
import Game3 from "./pages/Game3";
import SpinWheel from "./pages/SpinWheel";
import RabanaGame from "./pages/RabanaGame";
import CatchKavum from "./pages/CatchKavum";
import BreakPot from "./pages/BreakPot";
import Welcome from "./pages/Welcome";
import BackgroundMusic from "./components/BackgroundMusic";
import { LanguageProvider } from "./context/LanguageContext";
import { AudioProvider } from "./context/AudioContext.js";

function AppRoutes({ player, setPlayer }) {
  return (
    <>
      {/* <BackgroundMusic /> */}

      <Routes>
        <Route
          path="/"
          element={
            player ? (
              <GamesHome player={player} />
            ) : (
              <Navigate to="/welcome" replace />
            )
          }
        />

        <Route path="/welcome" element={<Welcome setPlayer={setPlayer} />} />

        <Route
          path="/spin"
          element={
            player ? (
              <SpinWheel player={player} />
            ) : (
              <Navigate to="/welcome" replace />
            )
          }
        />

        <Route
          path="/game1"
          element={
            player ? (
              <Game1 player={player} />
            ) : (
              <Navigate to="/welcome" replace />
            )
          }
        />

        <Route
          path="/game2"
          element={
            player ? (
              <Game2 player={player} />
            ) : (
              <Navigate to="/welcome" replace />
            )
          }
        />

        <Route
          path="/game3"
          element={
            player ? (
              <Game3 player={player} />
            ) : (
              <Navigate to="/welcome" replace />
            )
          }
        />

        <Route
          path="/rabana"
          element={
            player ? (
              <RabanaGame player={player} />
            ) : (
              <Navigate to="/welcome" replace />
            )
          }
        />

        <Route
          path="/kavum"
          element={
            player ? (
              <CatchKavum player={player} />
            ) : (
              <Navigate to="/welcome" replace />
            )
          }
        />

        <Route
          path="/break"
          element={
            player ? (
              <BreakPot player={player} />
            ) : (
              <Navigate to="/welcome" replace />
            )
          }
        />
      </Routes>
    </>
  );
}

function App() {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("player");
    if (saved) {
      setPlayer(JSON.parse(saved));
    }
  }, []);

  return (
    <LanguageProvider>
      <LanguageProvider>
        <AudioProvider>
          <AppRoutes player={player} setPlayer={setPlayer} />
        </AudioProvider>
      </LanguageProvider>
    </LanguageProvider>
  );
}

export default App;
