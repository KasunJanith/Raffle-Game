import { useEffect, useRef } from "react";
import bgMusic from "../assets/sounds/bg-music.mp3";

export default function BackgroundMusic() {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.volume = 0.2; // 🔊 adjust volume (0.0 - 1.0)

    const playMusic = () => {
      audio.play().catch(() => {
        console.log("Autoplay blocked");
      });
    };

    // ▶️ play after user interaction (required by browsers)
    window.addEventListener("click", playMusic);

    return () => {
      window.removeEventListener("click", playMusic);
    };
  }, []);

  return (
    <audio ref={audioRef} loop>
      <source src={bgMusic} type="audio/mpeg" />
    </audio>
  );
}