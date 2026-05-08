import { Card, Button } from "antd";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  GiftOutlined,
  StarOutlined,
  FireOutlined,
  TrophyOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import Timer from "../components/Timer";
import kavum from "../assets/kavum.png";
import GameEndModal from "../components/GameEndModal";
import { submitCatchKavumGame } from "../api/gameApi";
import moveSound from "../assets/sounds/move.mp3";
import { useLanguage } from "../context/LanguageContext";
import WINWAYLogo from "../assets/WIN WAY English Logo- PNG.png";
import AwuruduGames from "../assets/Aluth Awurudu Games.png";
import NextQuestionLoader from "../components/NextQuestionLoader";

export default function CatchKavum({ player }) {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const text = {
    si: {
      badge: "කැවුම් අල්ලීමේ ක්‍රීඩාව",
      title: "කැවුම් අල්ලාගන්න!",
      subtitle: "කාලය ඉවර වීමට පෙර හැකි තරම් කැවුම් අල්ලාගන්න!",
      readyTitle: "අල්ලාගන්න සූදානම්ද?",
      readyDesc:
        "කැවුම කොටුව ඇතුළේ චලනය වෙයි.\nහැකි තරම් ඉක්මනින් එය අල්ලාගන්න ඔබගේ ලකුණු වැඩි කරගන්න.",
      startGame: "ක්‍රීඩාව ආරම්භ කරන්න",
      countdownTitle: "ආරම්භ වීමට තව තත්පර",
      countdownDesc: "චලනය වන කැවුම අල්ලාගන්න",
      timeLeft: "ඉතිරි වේලාව",
      score: "ලකුණු",
      instruction: "කැවුම පනින්න කලින් ඉක්මනින් අල්ලාගන්න!",
      timeUp: "කාලය අවසන්!",
      caughtCount: "ඔබ අල්ලාගත් කැවුම් ගණන",
      playAgain: "නැවත ක්‍රීඩා කරන්න",
      goHome: "මුල් පිටුවට යන්න",
      guest: "Guest",
      notAvailable: "N/A",
    },
    ta: {
      badge: "கவ்வும் பிடிக்கும் விளையாட்டு",
      title: "கவ்வுமை பிடியுங்கள்!",
      subtitle: "நேரம் முடிவதற்கு முன் முடிந்தவரை அதிக கவ்வுமை பிடியுங்கள்!",
      readyTitle: "பிடிக்க தயாரா?",
      readyDesc:
        "கவ்வும் பெட்டிக்குள் நகரும்.\nமுடிந்தவரை வேகமாக அதை பிடித்து உங்கள் மதிப்பெண்ணை உயர்த்துங்கள்.",
      startGame: "விளையாட்டை தொடங்கவும்",
      countdownTitle: "தொடங்க இன்னும் விநாடிகள்",
      countdownDesc: "நகரும் கவ்வுமை பிடியுங்கள்",
      timeLeft: "மீதமுள்ள நேரம்",
      score: "மதிப்பெண்",
      instruction: "கவ்வும் தப்பிக்கும் முன் வேகமாக பிடியுங்கள்!",
      timeUp: "நேரம் முடிந்தது!",
      caughtCount: "நீங்கள் பிடித்த கவ்வும்களின் எண்ணிக்கை",
      playAgain: "மீண்டும் விளையாடுங்கள்",
      goHome: "முகப்பு பக்கத்துக்கு செல்லவும்",
      guest: "Guest",
      notAvailable: "N/A",
    },
  };

  const t = text[language] || text.si;

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const [score, setScore] = useState(0);
  const [position, setPosition] = useState({ top: 100, left: 100 });
  const [finished, setFinished] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [gameStarted, setGameStarted] = useState(false);
  const [startClicked, setStartClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [catchEffect, setCatchEffect] = useState(false);
  const [showRipple, setShowRipple] = useState(false);
  const [particles, setParticles] = useState([]);
  const [lastCatchTime, setLastCatchTime] = useState(0);
  const [loadingNext, setLoadingNext] = useState(false);

  // Track mouse for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const moveSoundRef = useRef(null);

  useEffect(() => {
    moveSoundRef.current = new Audio(moveSound);
    moveSoundRef.current.volume = 0.4;
  }, []);

  const createParticles = (x, y) => {
    const newParticles = [];
    for (let i = 0; i < 8; i++) {
      newParticles.push({
        id: Date.now() + i,
        x: x,
        y: y,
        angle: i * 45 * (Math.PI / 180),
        delay: i * 0.03,
      });
    }
    setParticles([...particles, ...newParticles]);

    setTimeout(() => {
      setParticles([]);
    }, 500);
  };
  const handleNext = () => {
    const progress = JSON.parse(localStorage.getItem("gamesPlayed") || "{}");

    const keyMap = {
      game_quiz_done: "quiz",
      game_kavum_done: "kavum_count",
      game_lamps_done: "hidden_lamps",
      game_rabana_done: "rabana",
      game_catch_kavum_done: "catch_kavum",
      game_break_pot_done: "break_pot",
    };

    const gamesFlow = [
      { key: "game_quiz_done", route: "/game1" },
      { key: "game_kavum_done", route: "/game2" },
      { key: "game_lamps_done", route: "/game3" },
      { key: "game_rabana_done", route: "/rabana" },
      { key: "game_catch_kavum_done", route: "/kavum" },
      { key: "game_break_pot_done", route: "/break" },
    ];

    for (let game of gamesFlow) {
      const cleanKey = keyMap[game.key];
      const isDone = progress?.[cleanKey]?.completed;

      if (!isDone) {
        navigate(game.route); // ✅ go next game
        return;
      }
    }

    // ✅ all completed
    console.log(progress);

    // ✅ all completed
          setLoadingNext(false);

       navigate("/"); // or show bonus modal

  };
  // Inject enhanced animations
  useEffect(() => {
    const styleId = "catchkavum-festival-animations";
    if (document.getElementById(styleId)) return;

    const style = document.createElement("style");
    style.id = styleId;
    style.innerHTML = `
      @keyframes floatIn {
        0% {
          opacity: 0;
          transform: translateY(30px) scale(0.9);
        }
        100% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      @keyframes gentleFloat {
        0%, 100% {
          transform: translateY(0) rotate(0deg);
        }
        25% {
          transform: translateY(-8px) rotate(2deg);
        }
        75% {
          transform: translateY(8px) rotate(-2deg);
        }
      }

      @keyframes pulseGlow {
        0%, 100% {
          filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.3));
        }
        50% {
          filter: drop-shadow(0 0 25px rgba(255, 215, 0, 0.6));
        }
      }

      @keyframes spinSlow {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      @keyframes catchPop {
        0% { transform: scale(1); }
        50% { transform: scale(1.3); }
        100% { transform: scale(1); }
      }

      @keyframes kavumFloat {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        25% { transform: translateY(-5px) rotate(5deg); }
        75% { transform: translateY(5px) rotate(-5deg); }
      }

      @keyframes comboPop {
        0% { transform: scale(0.5); opacity: 0; }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); opacity: 1; }
      }

      .game-card {
        animation: floatIn 0.7s ease forwards;
      }

      .kavum-image {
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        cursor: pointer;
        filter: drop-shadow(0 10px 18px rgba(139, 69, 19, 0.3));
        animation: kavumFloat 3s ease-in-out infinite;
      }

      .kavum-image:hover {
        transform: scale(1.1) rotate(5deg);
        filter: drop-shadow(0 15px 25px rgba(255, 215, 0, 0.4));
      }

      .kavum-image.catch-effect {
        animation: catchPop 0.2s ease;
      }

      .floating-element {
        position: absolute;
        pointer-events: none;
        opacity: 0.5;
        animation: gentleFloat var(--duration) ease-in-out infinite;
        animation-delay: var(--delay);
        filter: drop-shadow(0 0 5px rgba(255, 215, 0, 0.3));
      }

      .ripple-effect {
        position: absolute;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, rgba(255, 215, 0, 0) 70%);
        animation: ripple 0.4s ease-out;
        pointer-events: none;
        transform: translate(-50%, -50%);
      }

      @keyframes ripple {
        0% { width: 0; height: 0; opacity: 0.5; }
        100% { width: 200px; height: 200px; opacity: 0; }
      }

      .particle {
        position: fixed;
        width: 8px;
        height: 8px;
        background: #ffd700;
        border-radius: 50%;
        pointer-events: none;
        animation: particleFly 0.5s ease-out forwards;
        z-index: 1000;
        box-shadow: 0 0 10px #ffd700;
      }

      @keyframes particleFly {
        0% {
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
        }
        100% {
          transform: translate(-50%, -50%) 
                     translate(calc(cos(var(--angle)) * 80px), 
                             calc(sin(var(--angle)) * 80px)) 
                     scale(0);
          opacity: 0;
        }
      }

      .stat-card {
        animation: gentleFloat 3s ease-in-out infinite;
        transition: all 0.3s ease;
      }

      .stat-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 30px rgba(0,0,0,0.15);
      }

      .combo-text {
        animation: comboPop 0.3s ease;
        color: #FFD700;
        font-weight: bold;
      }
    `;
    document.head.appendChild(style);
  }, []);

  const moveKavum = () => {
    if (!containerRef.current) return;

    const gameArea = document.getElementById("game-area");
    if (!gameArea) return;

    const maxTop = gameArea.clientHeight - 150;
    const maxLeft = gameArea.clientWidth - 150;

    const top = Math.random() * Math.max(0, maxTop);
    const left = Math.random() * Math.max(0, maxLeft);

    setPosition({ top, left });

    if (moveSoundRef.current) {
      moveSoundRef.current.currentTime = 0;
      moveSoundRef.current.play().catch(() => {});
    }
  };
  const handleFinish = async () => {
    try {
      const res = await submitCatchKavumGame({
        name: player?.name || t.guest,
        phone: player?.phone || t.notAvailable,
        score: score,
       
      });
      if (res?.success) {
        // ✅ Get existing data
        const existing = JSON.parse(
          localStorage.getItem("gamesPlayed") || "{}",
        );

        // ✅ Update Catch Kavum
        existing["catch_kavum"] = {
          completed: true,
          score: score,
          completedAt: new Date().toISOString(),
        };

        // ✅ Save back
        localStorage.setItem("gamesPlayed", JSON.stringify(existing));
      }

      setFinished(true);
      setShowModal(true);
      setTimeout(() => {
        setLoadingNext(true);
      }, 6000);
      setTimeout(() => {
        handleNext();
      }, 10000);
    } catch (err) {
      console.log("Failed to save");
    }
  };

  const catchKavum = (e) => {
    if (!finished && gameStarted) {
      const rect = e.target.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const now = Date.now();

      setScore((prev) => prev + 1);

      setCatchEffect(true);
      setShowRipple(true);
      createParticles(centerX, centerY);

      setTimeout(() => setCatchEffect(false), 200);
      setTimeout(() => setShowRipple(false), 300);

      moveKavum();
    }
  };

  useEffect(() => {
    if (!startClicked) return;

    if (countdown === 0) {
      setGameStarted(true);
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, startClicked]);

  useEffect(() => {
    if (!gameStarted || finished) return;

    moveKavum();

    const interval = setInterval(() => {
      moveKavum();
    }, 800);

    return () => clearInterval(interval);
  }, [gameStarted, finished]);

  const restartGame = () => {
    setScore(0);
    setPosition({ top: 100, left: 100 });
    setFinished(false);
    setCountdown(3);
    setGameStarted(false);
    setStartClicked(false);
    setParticles([]);
  };

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 30% 30%, #8B4513, #D2691E, #CD853F)",
        padding: "30px 16px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            repeating-linear-gradient(
              45deg,
              rgba(255, 215, 0, 0.08) 0px,
              rgba(255, 215, 0, 0.08) 20px,
              rgba(210, 105, 30, 0.08) 20px,
              rgba(210, 105, 30, 0.08) 40px
            )
          `,
          animation: "spinSlow 60s linear infinite",
          pointerEvents: "none",
        }}
      />

      <div
        className="floating-element"
        style={{
          top: "10%",
          left: "5%",
          fontSize: 48,
          "--duration": "12s",
          "--delay": "0s",
          transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`,
        }}
      >
        🍘
      </div>
      <div
        className="floating-element"
        style={{
          top: "80%",
          right: "5%",
          fontSize: 36,
          "--duration": "15s",
          "--delay": "2s",
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
        }}
      >
        🪔
      </div>
      <div
        className="floating-element"
        style={{
          top: "20%",
          right: "15%",
          fontSize: 42,
          "--duration": "10s",
          "--delay": "1s",
          transform: `translate(${mousePosition.x * 0.4}px, ${mousePosition.y * 0.4}px)`,
        }}
      >
        🌸
      </div>
      <div
        className="floating-element"
        style={{
          bottom: "15%",
          left: "10%",
          fontSize: 40,
          "--duration": "14s",
          "--delay": "3s",
          transform: `translate(${mousePosition.x * 0.6}px, ${mousePosition.y * 0.6}px)`,
        }}
      >
        🎯
      </div>
      <div
        className="floating-element"
        style={{
          top: "40%",
          right: "20%",
          fontSize: 32,
          "--duration": "11s",
          "--delay": "1.5s",
          transform: `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px)`,
        }}
      >
        ✨
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          width: "100%",
          maxWidth: 620,
          position: "relative",
          zIndex: 10,
        }}
      >
        <Card
          className="game-card"
          style={{
            borderRadius: 32,
            background: "rgba(255, 248, 240, 0.97)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 30px 60px rgba(139, 69, 19, 0.3)",
            border: "2px solid #FFD700",
            overflow: "hidden",
          }}
          bodyStyle={{ padding: 32 }}
        >
          <div
            style={{
              marginBottom: 24,
              paddingBottom: 16,
              borderBottom: "2px dashed #FFD700",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -10,
                left: -10,
                width: 60,
                height: 60,
                background:
                  "radial-gradient(circle, rgba(255,215,0,0.2) 0%, transparent 70%)",
                borderRadius: "50%",
                animation: "spinSlow 15s linear infinite",
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                width: "100%",
                maxWidth: 420,
                margin: "0 auto",
                marginBottom: 0,
              }}
            >
              <motion.img
                src={WINWAYLogo}
                alt="Winway Logo"
                initial={{ opacity: 0, scale: 0.85, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.65 }}
                style={{
                  width: 120,
                  height: "auto",
                  objectFit: "contain",
                  filter: "drop-shadow(0 8px 18px rgba(139, 69, 19, 0.18))",
                }}
              />

              <motion.img
                src={AwuruduGames}
                alt="Awurudu Games"
                initial={{ opacity: 0, scale: 0.85, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.65 }}
                style={{
                  width: 180,
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </div>

            <h2
              style={{
                margin: "12px 0 8px",
                color: "#8B4513",
                fontSize: 32,
                fontWeight: 800,
                textAlign: "center",
                background: "linear-gradient(135deg, #8B4513, #D2691E)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {t.title}
            </h2>

            <p style={{ textAlign: "center", color: "#7a7a7a", fontSize: 15 }}>
              {t.subtitle}
            </p>
          </div>
      <NextQuestionLoader
        visible={loadingNext}
        text="Next question loading..."
      />
          {!startClicked && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              style={{
                background: "linear-gradient(135deg, #FFF8E7, #FFEBCD)",
                border: "2px solid #FFD700",
                borderRadius: 24,
                padding: "24px 20px",
                marginBottom: 20,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <h3
                style={{
                  marginBottom: 10,
                  color: "#8B4513",
                  fontSize: 22,
                  fontWeight: 700,
                }}
              >
                {t.readyTitle}
              </h3>

              <p
                style={{
                  marginBottom: 18,
                  color: "#5f5f5f",
                  lineHeight: 1.7,
                  fontSize: 15,
                  whiteSpace: "pre-line",
                }}
              >
                {t.readyDesc}
              </p>

              <Button
                type="primary"
                size="large"
                onClick={() => setStartClicked(true)}
                style={{
                  height: 50,
                  padding: "0 28px",
                  borderRadius: 30,
                  background: "linear-gradient(135deg, #E44D2E, #F9A826)",
                  border: "none",
                  fontWeight: 700,
                  fontSize: 16,
                  boxShadow: "0 10px 24px rgba(228,77,46,0.3)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-3px) scale(1.02)";
                  e.currentTarget.style.boxShadow =
                    "0 15px 30px rgba(228,77,46,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 24px rgba(228,77,46,0.3)";
                }}
              >
                {t.startGame}
              </Button>
            </motion.div>
          )}

          {startClicked && !gameStarted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                padding: "24px 16px",
                marginBottom: 20,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <h2 style={{ marginBottom: 20, color: "#8B4513" }}>
                {t.countdownTitle}
              </h2>
              <div
                style={{
                  width: 120,
                  height: 120,
                  margin: "0 auto 14px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #E44D2E, #F9A826)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: 52,
                  fontWeight: 800,
                  boxShadow: "0 12px 30px rgba(228,77,46,0.3)",
                  animation: "pulseGlow 1s ease infinite",
                }}
              >
                {countdown}
              </div>
              <p style={{ color: "#777", marginTop: 25 }}>{t.countdownDesc}</p>
            </motion.div>
          )}

          {gameStarted && !finished && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 14,
                flexWrap: "wrap",
                marginBottom: 22,
              }}
            >
              <div
                className="stat-card"
                style={{
                  minWidth: 150,
                  background: "linear-gradient(135deg, #FFF8E7, #FFE4B5)",
                  border: "2px solid #FFD700",
                  borderRadius: 20,
                  padding: "14px 18px",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    color: "#8B4513",
                    fontWeight: 700,
                    marginBottom: 6,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <ClockCircleOutlined /> {t.timeLeft}
                </div>

                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 800,
                    color: "#E44D2E",
                  }}
                >
                  <Timer seconds={10} onFinish={handleFinish} />
                </div>
              </div>

              <div
                className="stat-card"
                style={{
                  minWidth: 150,
                  background: "linear-gradient(135deg, #E8F5E9, #C8E6C9)",
                  border: "2px solid #4CAF50",
                  borderRadius: 20,
                  padding: "14px 18px",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    color: "#2E7D32",
                    fontWeight: 700,
                    marginBottom: 6,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <TrophyOutlined /> {t.score}
                </div>

                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    color: "#2E7D32",
                  }}
                >
                  {score}
                </div>
              </div>
            </motion.div>
          )}

          {gameStarted && !finished && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              id="game-area"
              style={{
                height: 360,
                position: "relative",
                overflow: "hidden",
                borderRadius: 24,
                background:
                  "linear-gradient(180deg, #FFF8E7, #FFE4B5, #DEB887)",
                border: "3px solid #FFD700",
                boxShadow: "inset 0 4px 20px rgba(0,0,0,0.1)",
                marginBottom: 16,
              }}
            >
              <img
                src={kavum}
                alt="kavum"
                className={`kavum-image ${catchEffect ? "catch-effect" : ""}`}
                style={{
                  width: 150,
                  position: "absolute",
                  top: position.top,
                  left: position.left,
                  cursor: "pointer",
                }}
                onClick={catchKavum}
              />

              {showRipple && (
                <div
                  className="ripple-effect"
                  style={{
                    left: position.left + 75,
                    top: position.top + 75,
                  }}
                />
              )}

              {particles.map((particle) => (
                <div
                  key={particle.id}
                  className="particle"
                  style={{
                    left: particle.x,
                    top: particle.y,
                    "--angle": particle.angle,
                    animationDelay: `${particle.delay}s`,
                  }}
                />
              ))}
            </motion.div>
          )}

          {gameStarted && !finished && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{
                color: "#777",
                fontSize: 14,
                marginTop: 6,
                textAlign: "center",
                animation: "pulseGlow 2s ease-in-out infinite",
              }}
            >
              {t.instruction}
            </motion.p>
          )}

          <AnimatePresence>
            {finished && (
              <motion.div
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                  background: "linear-gradient(135deg, #FFF9E6, #FFE4B5)",
                  border: "3px solid #FFD700",
                  borderRadius: 24,
                  padding: "22px 18px",
                  marginTop: 16,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <h2 style={{ color: "#8B4513", fontSize: 28, marginBottom: 8 }}>
                  {t.timeUp}
                </h2>

                <div
                  style={{
                    background: "linear-gradient(135deg, #FFD700, #FFA500)",
                    padding: "20px",
                    borderRadius: 20,
                    marginBottom: 16,
                  }}
                >
                  <div
                    style={{ color: "#8B4513", fontSize: 16, marginBottom: 5 }}
                  >
                    {t.caughtCount}
                  </div>
                  <h3
                    style={{
                      color: "#8B4513",
                      fontSize: 48,
                      margin: 0,
                      fontWeight: 800,
                    }}
                  >
                    {score}
                  </h3>
                </div>
                {/* <div
                  style={{
                    display: "flex",
                    gap: 12,
                    marginTop: 24,
                    flexWrap: "wrap",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Button
                    onClick={() => navigate("/")}
                    style={{
                      height: 48,
                      padding: "0 32px",
                      borderRadius: 30,
                      fontWeight: 700,
                      fontSize: 16,
                      background: "linear-gradient(135deg, #1677ff, #4096ff)", // 🔵 BLUE
                      border: "none",
                      color: "white",
                      boxShadow: "0 10px 20px rgba(22,119,255,0.3)",
                    }}
                  >
                    {t.goHome}
                  </Button>

                  {score === 0 && (
                    <Button
                      onClick={restartGame}
                      style={{
                        height: 46,
                        borderRadius: 23,
                        fontWeight: 700,
                        border: "2px solid #FFD700",
                        background: "white",
                        color: "#8B4513",
                        transition: "all 0.3s ease",
                        padding: "0 30px",
                        marginBottom: 5,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow =
                          "0 10px 20px rgba(255,215,0,0.3)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      {t.playAgain}
                    </Button>
                  )}


                </div> */}
              </motion.div>
            )}
          </AnimatePresence>

          <div
            style={{
              marginTop: 24,
              display: "flex",
              justifyContent: "center",
              gap: 16,
              opacity: 0.6,
            }}
          >
            <span
              style={{
                fontSize: 20,
                animation: "gentleFloat 3s ease-in-out infinite",
              }}
            >
              🍘
            </span>
            <span
              style={{
                fontSize: 20,
                animation: "gentleFloat 3.5s ease-in-out infinite",
              }}
            >
              🎯
            </span>
            <span
              style={{
                fontSize: 20,
                animation: "gentleFloat 4s ease-in-out infinite",
              }}
            >
              ✨
            </span>
            <span
              style={{
                fontSize: 20,
                animation: "gentleFloat 2.5s ease-in-out infinite",
              }}
            >
              🌟
            </span>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
