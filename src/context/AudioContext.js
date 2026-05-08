import { createContext, useContext, useEffect, useRef, useState } from "react";
import bgMusic from "../assets/sounds/bg-music.mp3";


const AudioContext = createContext(null);

export function AudioProvider({ children }) {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(() => {
    return localStorage.getItem("appMuted") === "true";
  });
  const [volume, setVolume] = useState(() => {
    return  0.5;
  });

  useEffect(() => {
    const audio = new Audio(bgMusic);
    audio.loop = true;
    audio.volume = volume;
    audio.muted = isMuted;
    audioRef.current = audio;

    const startAudio = () => {
      audio.play().catch(() => {});
      window.removeEventListener("click", startAudio);
    };

    window.addEventListener("click", startAudio);

    return () => {
      window.removeEventListener("click", startAudio);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = isMuted;
    localStorage.setItem("appMuted", String(isMuted));
  }, [isMuted]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
    localStorage.setItem("appVolume", String(volume));
  }, [volume]);

  const toggleMute = () => setIsMuted((prev) => !prev);

  return (
    <AudioContext.Provider
      value={{
        isMuted,
        toggleMute,
        volume,
        setVolume,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);

  if (!context) {
    throw new Error("useAudio must be used inside AudioProvider");
  }

  return context;
}