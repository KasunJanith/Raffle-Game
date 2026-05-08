import { Card, Button, Row, Col, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo, useRef } from "react";
import BonusSpinModal from "../components/BonusSpinModal";
import bannerVideoMobile from "../assets/videos/Mobile.mp4";
import bannerVideoWeb from "../assets/videos/Web.mp4";
import Dana from "../assets/All lotteries/DN- FRI.png";
import Govi from "../assets/All lotteries/GS- FRI.png";
import { useLanguage } from "../context/LanguageContext";
import Handa from "../assets/All lotteries/H- SAT.png";
import Mega from "../assets/All lotteries/MP- WED.png";
import Maha from "../assets/All lotteries/MS- FRI.png";
import Jaya from "../assets/All lotteries/Jaya - Fri.jpg";
import {
  GiftOutlined,
  LockOutlined,
  CheckCircleOutlined,
  TrophyOutlined,
  FireOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { getSpinResultsFiltered, saveGameSummary } from "../api/gameApi";
import { motion } from "framer-motion";
import BonusCard from "../components/BonusCard";
import FinalRewardModal from "../components/FinalRewardModal";

export default function GamesHome({ player }) {
  const navigate = useNavigate();
  const [showBonus, setShowBonus] = useState(false);
  const [activeGame, setActiveGame] = useState(null);
  const [completedGames, setCompletedGames] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showFireworks, setShowFireworks] = useState(false);
  const [floatingElements, setFloatingElements] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const { language } = useLanguage();
  const [alreadyPlayed, setAlreadyPlayed] = useState(false);
  const progress = JSON.parse(localStorage.getItem("gamesPlayed") || "{}");

  const games = [
    { key: "quiz", name: "Quiz Game" },
    { key: "kavum_count", name: "Kavum Count" },
    { key: "hidden_lamps", name: "Hidden Lamps" },
    { key: "rabana", name: "Rabana" },
    { key: "catch_kavum", name: "Catch Kavum" },
    { key: "break_pot", name: "Break Pot" },
  ];
  const [finalRewardModal, setFinalRewardModal] = useState(false);

  useEffect(() => {
    // ✅ get unified storage
    const progress = JSON.parse(localStorage.getItem("gamesPlayed") || "{}");

    const status = {};

    data.forEach((game) => {
      status[game.key] = progress?.[game.key]?.completed || false;
    });

    setCompletedGames(status);

    const savedActive = localStorage.getItem("activeGame");
    if (savedActive) setActiveGame(savedActive);
  }, [language]);

  const sendSummary = async () => {
    const progress = JSON.parse(localStorage.getItem("gamesPlayed") || "{}");
    const player = JSON.parse(localStorage.getItem("player") || "{}");

    const res = await saveGameSummary({
      name: player.name,
      phone: player.phone,
      games: progress,
    });

    if (res.success) {
      console.log("Saved to Google Sheet ✅");
    } else {
      console.log("Failed ❌");
    }
  };

  const getSummery = async () => {
    const data = await getSpinResultsFiltered({
      phone: player.phone,
    });

    console.log(data);

    if (data && data.length > 0) {
      console.log(" ✅ user already played");

      setAlreadyPlayed(true); // ✅ user already played
    } else {
      console.log(" ✅ user not played");
      setAlreadyPlayed(false); // ✅ user not played
    }
  };

  const uiText = {
    si: {
      sessionEnded: "සැසිය අවසන් කරන ලදී. නැවත එන්න! 👋",
      alreadyCompleted: "ඔබ දැනටමත් මෙම ක්‍රීඩාව සම්පූර්ණ කර ඇත! 🎉",
      finishCurrent: "කරුණාකර පළමුව වත්මන් ක්‍රීඩාව අවසන් කරන්න",
      startingGameSuffix: "ආරම්භ කරමින්...",
      completed: "සම්පූර්ණයි",
      playing: "ක්‍රීඩා කරමින්",
      playNowBadge: "ක්‍රීඩා කරන්න",
      locked: "අගුළු දමා ඇත",
      playButtonMobile: " ක්‍රීඩා කරන්න",
      playButtonDesktop: "දැන් ක්‍රීඩා කරන්න ",
      completedMobile: "✅ සම්පූර්ණයි",
      completedDesktop: "සම්පූර්ණයි ✅",
      lockedMobile: "🔒 අගුළු දමා ඇත",
      lockedDesktop: "අගුළු දමා ඇත 🔒",
      bonusTitleMobile: "Bonus Unlocked!",
      bonusTitleDesktop: "Bonus Unlocked! 🎉",
      bonusDescMobile: "සියලුම ක්‍රීඩා සම්පූර්ණ කළා!",
      bonusDescDesktop: "ඔබ සියලුම ක්‍රීඩා සාර්ථකව සම්පූර්ණ කළා!",
      luckyWheel: "වාසනාවන්ත රෝදය",
      goldMedal: "රන් පදක්කම",
      spinMobile: "Spin",
      spinDesktop: "Spin the Wheel",
      sessionMobile: "Session",
      sessionDesktop: "Session Controls",
      sessionDescMobile: "සියලු ප්‍රගතිය ඉවත් කර නැවත ආරම්භ කරන්න",
      sessionDescDesktop: "සියලු ක්‍රීඩා ප්‍රගතිය ඉවත් කර නැවත ආරම්භ කරන්න",
      endSessionMobile: "End Session",
      endSessionDesktop: "End Session / Exit",
      sessionMobile: "මෙම සැසිය අවසන් කරන්න",
      sessionDesktop: "මෙම ක්‍රීඩා සැසිය අවසන් කරන්න",
      sessionDescMobile: "ඔබගේ වත්මන් ක්‍රීඩා සැසිය මෙතැනින් අවසන් කළ හැක.",
      sessionDescDesktop:
        "ඔබගේ වත්මන් ක්‍රීඩා සැසිය අවසන් කර නැවත ආරම්භ කිරීමට මෙතැනින් හැක.",
      endSessionMobile: "සැසිය අවසන් කරන්න",
      endSessionDesktop: "ක්‍රීඩා සැසිය අවසන් කරන්න",
      rewards: [
        "",
        "🔢 ගණිත ශූරතාව",
        "",
        "⚡ වේගවත් අත් ශූරතාව",
        "🎯 නිරවද්‍යතා ශූරතාව",
        "💪 බලවත් අත් ශූරතාව",
      ],
    },
    ta: {
      sessionEnded: "அமர்வு முடிக்கப்பட்டது. மீண்டும் வாருங்கள்! 👋",
      alreadyCompleted:
        "நீங்கள் ஏற்கனவே இந்த விளையாட்டை முடித்துவிட்டீர்கள்! 🎉",
      finishCurrent: "தயவுசெய்து முதலில் தற்போதைய விளையாட்டை முடிக்கவும்",
      startingGameSuffix: "தொடங்குகிறது...",
      completed: "முடிந்தது",
      playing: "விளையாடுகிறது",
      playNowBadge: "விளையாடு",
      locked: "பூட்டப்பட்டுள்ளது",
      playButtonMobile: " விளையாடு",
      playButtonDesktop: "இப்போது விளையாடுங்கள் ",
      completedMobile: "✅ முடிந்தது",
      completedDesktop: "முடிந்தது ✅",
      lockedMobile: "🔒 பூட்டப்பட்டுள்ளது",
      lockedDesktop: "பூட்டப்பட்டுள்ளது 🔒",
      bonusTitleMobile: "Bonus Unlocked!",
      bonusTitleDesktop: "Bonus Unlocked! 🎉",
      bonusDescMobile: "அனைத்து விளையாட்டுகளும் முடிந்தது!",
      bonusDescDesktop:
        "நீங்கள் அனைத்து விளையாட்டுகளையும் வெற்றிகரமாக முடித்துவிட்டீர்கள்!",
      luckyWheel: "அதிர்ஷ்ட சக்கரம்",
      goldMedal: "தங்க பதக்கம்",
      spinMobile: "சுழற்று",
      spinDesktop: "சக்கரத்தை சுழற்று",
      sessionMobile: "அமர்வு",
      sessionDesktop: "Session Controls",
      sessionDescMobile: "அனைத்து முன்னேற்றத்தையும் நீக்கி மீண்டும் தொடங்கவும்",
      sessionDescDesktop:
        "அனைத்து விளையாட்டு முன்னேற்றத்தையும் நீக்கி மீண்டும் தொடங்கவும்",
      endSessionMobile: "அமர்வை முடிக்க",
      endSessionDesktop: "அமர்வை முடிக்க / வெளியேறு",
      sessionMobile: "இந்த அமர்வை முடிக்கவும்",
      sessionDesktop: "இந்த விளையாட்டு அமர்வை முடிக்கவும்",
      sessionDescMobile: "உங்கள் தற்போதைய விளையாட்டு அமர்வை இங்கே முடிக்கலாம்.",
      sessionDescDesktop:
        "உங்கள் தற்போதைய விளையாட்டு அமர்வை முடித்து மீண்டும் தொடங்க இங்கே முடியும்.",
      endSessionMobile: "அமர்வை முடிக்கவும்",
      endSessionDesktop: "விளையாட்டு அமர்வை முடிக்கவும்",
      rewards: [
        "",
        "🔢 கணித சாம்பியன்",
        "",
        "⚡ வேகமான கைகள் சாம்பியன்",
        "🎯 துல்லிய சாம்பியன்",
        "💪 வலுவான கைகள் சாம்பியன்",
      ],
    },
  };

  const gameTexts = {
    si: [
      {
        option: "අවුරුදු ප්‍රශ්න මාලාව",
        description: "අවුරුදු දැනුම පරීක්ෂා කරන්න",
      },
      {
        option: "කැවුම් ගණන හොයමු",
        description: "කැවුම් ගණන නිවැරදිව තෝරන්න",
      },
      {
        option: "සැඟවුණු පහන් හොයමු",
        description: "රූපයේ සැඟවුණු දේ සොයන්න",
      },
      {
        option: "තාලෙට රබන් ගහමු",
        description: "ඉක්මනින් රබානට තට්ටු කරන්න",
      },
      {
        option: "කැවුම් අල්ලමු",
        description: "හැකි තරම් කැවුම් අල්ලමු",
      },
      {
        option: "කණා මුට්ටිය බිඳිමු",
        description: "මුට්ටිය ඉක්මනින් බිඳ දමන්න",
      },
    ],
    ta: [
      {
        option: "புத்தாண்டு வினாடி வினா",
        description: "புத்தாண்டு அறிவை சோதிக்கவும்",
      },
      {
        option: "கவ்வும் எண்ணிக்கையை கண்டுபிடிப்போம்",
        description: "சரியான கவ்வும் எண்ணிக்கையை தேர்வு செய்யவும்",
      },
      {
        option: "மறைந்த விளக்குகளை கண்டுபிடிப்போம்",
        description: "படத்தில் மறைந்தவற்றை கண்டுபிடிக்கவும்",
      },
      {
        option: "ரபானாவை தாளத்தில் அடிப்போம்",
        description: "ரபானாவை வேகமாக தட்டவும்",
      },
      {
        option: "கவ்வும் பிடிப்போம்",
        description: "அதிகமாக கவ்வும் பிடிக்கவும்",
      },
      {
        option: "பானையை உடைப்போம்",
        description: "பானையை விரைவாக உடைக்கவும்",
      },
    ],
  };

  const currentUi = uiText[language] || uiText.si;
  const currentGameTexts = gameTexts[language] || gameTexts.si;

  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  const keyMap = {
    game_quiz_done: "quiz",
    game_kavum_done: "kavum_count",
    game_lamps_done: "hidden_lamps",
    game_rabana_done: "rabana",
    game_catch_kavum_done: "catch_kavum",
    game_break_pot_done: "break_pot",
  };
  const data = [
    {
      option: currentGameTexts[0].option,
      route: "/game1",
      key: "game_quiz_done",
      color: "#ff7875",
      gradient: "linear-gradient(135deg, #ff7875, #ff9f4b)",
      icon: "❓",
      description: currentGameTexts[0].description,
      reward: currentUi.rewards[0],
    },
    {
      option: currentGameTexts[1].option,
      route: "/game2",
      key: "game_kavum_done",
      color: "#ffd666",
      gradient: "linear-gradient(135deg, #ffd666, #ffb347)",
      icon: "🍘",
      description: currentGameTexts[1].description,
      reward: currentUi.rewards[1],
    },
    {
      option: currentGameTexts[2].option,
      route: "/game3",
      key: "game_lamps_done",
      color: "#69c0ff",
      gradient: "linear-gradient(135deg, #69c0ff, #5b8cff)",
      icon: "🔎",
      description: currentGameTexts[2].description,
      reward: currentUi.rewards[2],
    },
    {
      option: currentGameTexts[3].option,
      route: "/rabana",
      key: "game_rabana_done",
      color: "#95de64",
      gradient: "linear-gradient(135deg, #95de64, #6bcf7f)",
      icon: "🥁",
      description: currentGameTexts[3].description,
      reward: currentUi.rewards[3],
    },
    {
      option: currentGameTexts[4].option,
      route: "/kavum",
      key: "game_catch_kavum_done",
      color: "#b37feb",
      gradient: "linear-gradient(135deg, #b37feb, #9f6bdb)",
      icon: "🎯",
      description: currentGameTexts[4].description,
      reward: currentUi.rewards[4],
    },
    {
      option: currentGameTexts[5].option,
      route: "/break",
      key: "game_break_pot_done",
      color: "#ffa940",
      gradient: "linear-gradient(135deg, #ffa940, #ff8c5a)",
      icon: "🏺",
      description: currentGameTexts[5].description,
      reward: currentUi.rewards[5],
    },
  ];

  // Track mouse position for parallax effect (disable on mobile)
  useEffect(() => {
    if (isMobile) return;

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
  }, [isMobile]);
  const getProgress = () => {
    try {
      const raw = localStorage.getItem("gamesPlayed");

      if (!raw) return {};

      // 🔥 if already object (corrupted case)
      if (raw === "[object Object]") {
        localStorage.removeItem("gamesPlayed");
        return {};
      }

      return JSON.parse(raw);
    } catch (err) {
      console.error("Invalid gamesPlayed, resetting...");
      localStorage.removeItem("gamesPlayed");
      return {};
    }
  };
  const allGamesDone = useMemo(() => {
    const progress = getProgress();

    const keyMap = {
      game_quiz_done: "quiz",
      game_kavum_done: "kavum_count",
      game_lamps_done: "hidden_lamps",
      game_rabana_done: "rabana",
      game_catch_kavum_done: "catch_kavum",
      game_break_pot_done: "break_pot",
    };

    return data.every((game) => {
      const cleanKey = keyMap[game.key] || game.key;
      return progress?.[cleanKey]?.completed;
    });
  }, [data]);
  // Trigger fireworks when all games completed
  useEffect(() => {
    if (allGamesDone) {
      setShowFireworks(true);
      const timer = setTimeout(() => setShowFireworks(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [allGamesDone]);
  useEffect(() => {
    if (allGamesDone) {
      sendSummary();
      setFinalRewardModal(true);
    }
    getSummery();
  }, [allGamesDone, showBonus]);

  // Inject enhanced animations (keeping your existing animations)
  useEffect(() => {
    const styleId = "games-home-enhanced-animations";
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

      @keyframes spinSlow {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      @keyframes pulseGlow {
        0%, 100% {
          filter: drop-shadow(0 0 10px #f9ce1d);
        }
        50% {
          filter: drop-shadow(0 0 25px rgba(255, 215, 0, 0.6));
        }
      }

      @keyframes shimmer {
        0% {
          background-position: -1000px 0;
        }
        100% {
          background-position: 1000px 0;
        }
      }

      .card-lottery-deco {
        position: absolute;
        pointer-events: none;
        z-index: 1;
        opacity: 1;
        animation: floatLottery 2s ease-in-out infinite;
        filter: drop-shadow(0 8px 14px rgba(0, 0, 0, 0.18));
      }

      @keyframes firework {
        0% {
          transform: translate(-50%, -50%) scale(0);
          opacity: 1;
        }
        50% {
          transform: translate(-50%, -50%) scale(1.5);
          opacity: 0.8;
        }
        100% {
          transform: translate(-50%, -50%) scale(0);
          opacity: 0;
        }
      }

      @keyframes floatLottery {
        0% {
          transform: translateY(0px) rotate(0deg);
          opacity: 0.5;
        }
        50% {
          transform: translateY(-10px) rotate(3deg);
          opacity: 0.5;
        }
        100% {
          transform: translateY(0px) rotate(0deg);
          opacity: 0.6;
        }
      }

      @keyframes rotateY {
        from {
          transform: rotateY(0deg);
        }
        to {
          transform: rotateY(360deg);
        }
      }

      .games-card-animate {
        opacity: 0;
        animation: floatIn 0.7s cubic-bezier(0.215, 0.610, 0.355, 1) forwards;
      }

      .games-home-card {
        box-shadow: 0 15px 35px rgba(139, 69, 19, 0.15);
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        backdrop-filter: blur(5px);
        border: 1px solid rgba(255, 215, 0, 0.2);
      }

      .games-home-card:hover {
        transform: translateY(-12px) scale(1.02);
        box-shadow: 0 25px 45px rgba(218, 165, 32, 0.25);
        border-color: rgba(255, 215, 0, 0.5);
      }

      .games-home-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.5s ease;
      }

      .games-home-card:hover::before {
        left: 100%;
      }

      .games-glow-icon {
        animation: pulseGlow 3s ease-in-out infinite;
      }

      .floating-element {
        position: absolute;
        pointer-events: none;
        opacity: 0.6;
        animation: gentleFloat var(--duration) ease-in-out infinite;
        animation-delay: var(--delay);
        filter: drop-shadow(0 0 5px rgba(25, 0, 255, 0.3));
      }

      .firework {
        position: fixed;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: radial-gradient(circle, #ff0 0%, #f0f 50%, transparent 70%);
        animation: firework 1s ease-out forwards;
        pointer-events: none;
        z-index: 9999;
      }

      .progress-bar-glow {
        animation: pulseGlow 2s ease-in-out infinite;
      }

      .title-shimmer {
        background: linear-gradient(90deg, #8B4513, #D2691E, #f46060, #ff0000, #F4A460, #D2691E, #8B4513);
        background-size: 200% 100%;
        animation: shimmer 8s linear infinite;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      @media (max-width: 768px) {
        .games-home-card:hover {
          transform: translateY(-8px) scale(1.01);
        }

        .games-home-card:active {
          transform: scale(0.98);
        }
      }
    `;
    document.head.appendChild(style);
  }, []);

  useEffect(() => {
    if (activeGame) {
      localStorage.setItem("activeGame", activeGame);
    }
  }, [activeGame]);

  const completedCount = useMemo(() => {
    return data.filter((game) => completedGames[game.key]).length;
  }, [completedGames, data]);

  const handleEndSession = () => {
    localStorage.removeItem("activeGame");
    data.forEach((game) => localStorage.removeItem(game.key));
    localStorage.removeItem("player");
    localStorage.removeItem("bonus_reward");
    localStorage.removeItem("gamesPlayed");

    localStorage.removeItem("spinPrize");
    setActiveGame(null);
    setCompletedGames({});
    setShowBonus(false);
    setAlreadyPlayed(false);
    message.success({
      content: currentUi.sessionEnded,
      duration: 2,
      style: { marginTop: isMobile ? "10vh" : "20vh" },
    });

    navigate("/welcome");
  };

  const quickPlay = (game) => {
    const isCompleted = completedGames[game.key];

    if (isCompleted) {
      message.warning({
        content: currentUi.alreadyCompleted,
        icon: <CheckCircleOutlined />,
        style: { marginTop: isMobile ? "10vh" : "20vh" },
      });
      return;
    }

    if (activeGame && activeGame !== game.route) {
      message.warning({
        content: currentUi.finishCurrent,
        icon: <LockOutlined />,
        style: { marginTop: isMobile ? "10vh" : "20vh" },
      });
      return;
    }

    setActiveGame(game.route);
    message.success({
      content: ` ${game.option} ${currentUi.startingGameSuffix}`,
      duration: 1,
    });
    navigate(game.route);
  };

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          background:
            "radial-gradient(circle at 30% 30%, #FFE4B5, #DEB887, #8B4513)",
          padding: isMobile ? "0 10px" : 0,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          className="games-card-animate"
          style={{
            overflow: "hidden",
            position: "relative",
            boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
          }}
        >
          <video
            src={isMobile ? bannerVideoMobile : bannerVideoWeb}
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.2), rgba(0,0,0,0.5))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              textAlign: "center",
            }}
          />
        </div>

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
              rgba(255, 215, 0, 0.05) 0px,
              rgba(255, 215, 0, 0.05) 20px,
              rgba(210, 105, 30, 0.05) 20px,
              rgba(210, 105, 30, 0.05) 40px
            )
          `,
            animation: isMobile ? "none" : "spinSlow 60s linear infinite",
            pointerEvents: "none",
          }}
        />

        {showFireworks && (
          <>
            {[...Array(isMobile ? 8 : 15)].map((_, i) => (
              <div
                key={i}
                className="firework"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                  animationDelay: `${Math.random() * 0.5}s`,
                  background: `radial-gradient(circle, ${["#ff0", "#f0f", "#0ff", "#ff9900"][Math.floor(Math.random() * 4)]} 0%, transparent 70%)`,
                }}
              />
            ))}
          </>
        )}

        <div
          style={{
            maxWidth: isMobile ? "100%" : 1100,
            margin: "0 auto",
            position: "relative",
            zIndex: 10,
            marginTop: 50,
            padding: isMobile ? "20px 0" : "0",
          }}
        >
          <Row
            gutter={[isMobile ? 16 : 24, isMobile ? 16 : 24]}
            justify="center"
          >
            {data.map((game, index) => {
              const cleanKey = keyMap[game.key] || game.key;
              const gameData = progress?.[cleanKey];

              const isCompleted = gameData?.completed || false;

              const isLocked =
                activeGame && activeGame !== game.route && !isCompleted;

              return (
                <Col xs={24} sm={12} md={8} key={game.key}>
                  <div
                    className="games-card-animate"
                    style={{
                      animationDelay: `${index * 0.12}s`,
                    }}
                  >
                    <Card
                      hoverable={!isLocked}
                      onClick={() => !isLocked && quickPlay(game)}
                      className="games-home-card"
                      style={{
                        borderRadius: isMobile ? 20 : 24,
                        overflow: "hidden",
                        cursor: isLocked ? "not-allowed" : "pointer",
                        border: "none",
                        position: "relative",
                        background: isCompleted
                          ? "linear-gradient(135deg, #f6ffed, #d9f7be)"
                          : "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(10px)",
                        opacity: isLocked ? 0.6 : 1,
                        minHeight: isMobile ? 280 : 300,
                        transform: isLocked ? "scale(0.98)" : "scale(1)",
                        margin: isMobile ? "0" : "0",
                        WebkitTapHighlightColor: "transparent",
                      }}
                      bodyStyle={{
                        padding: isMobile ? 16 : 24,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        minHeight: isMobile ? 280 : 300,
                      }}
                    >
                      {isCompleted && (
                        <div
                          style={{
                            position: "absolute",
                            top: isMobile ? 8 : 12,
                            right: isMobile ? 8 : 12,
                            background: "#52c41a",
                            color: "white",
                            padding: isMobile ? "2px 8px" : "4px 12px",
                            borderRadius: 20,
                            fontSize: isMobile ? 10 : 12,
                            display: "flex",
                            alignItems: "center",
                            gap: isMobile ? 2 : 4,
                            zIndex: 10,
                            boxShadow: "0 4px 12px rgba(82,196,26,0.3)",
                          }}
                        >
                          <CheckCircleOutlined
                            style={{ fontSize: isMobile ? 10 : 12 }}
                          />
                          {currentUi.completed}
                        </div>
                      )}

                      {isLocked && !isCompleted && (
                        <div
                          style={{
                            position: "absolute",
                            top: isMobile ? 8 : 12,
                            right: isMobile ? 8 : 12,
                            background: "rgba(0,0,0,0.6)",
                            color: "white",
                            width: isMobile ? 30 : 36,
                            height: isMobile ? 30 : 36,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 10,
                            backdropFilter: "blur(5px)",
                          }}
                        >
                          <LockOutlined
                            style={{ fontSize: isMobile ? 14 : 16 }}
                          />
                        </div>
                      )}

                      {activeGame === game.route && !isCompleted && (
                        <div
                          style={{
                            position: "absolute",
                            top: isMobile ? 8 : 12,
                            left: isMobile ? 8 : 12,
                            background: "#FFD700",
                            color: "#8B4513",
                            padding: isMobile ? "2px 8px" : "4px 12px",
                            borderRadius: 20,
                            fontSize: isMobile ? 10 : 12,
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                            gap: isMobile ? 2 : 4,
                            zIndex: 10,
                            boxShadow: "0 4px 12px rgba(255,215,0,0.3)",
                            maxWidth: isMobile ? "70%" : "auto",
                          }}
                        >
                          <FireOutlined
                            style={{ fontSize: isMobile ? 10 : 12 }}
                          />
                          {isMobile
                            ? currentUi.playing
                            : currentUi.playNowBadge}
                        </div>
                      )}

                      <div style={{ textAlign: "center" }}>
                        <div
                          style={{
                            width: isMobile ? 60 : 80,
                            height: isMobile ? 60 : 80,
                            borderRadius: "50%",
                            margin: isMobile ? "0 auto 12px" : "0 auto 16px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: isMobile ? 30 : 40,
                            background: game.gradient,
                            boxShadow: `0 15px 25px ${game.color}40`,
                            animation: "gentleFloat 3s ease-in-out infinite",
                          }}
                        >
                          {game.icon}
                        </div>

                        <h3
                          style={{
                            fontSize: isMobile ? 16 : 18,
                            fontWeight: 800,
                            marginBottom: isMobile ? 8 : 10,
                            color: "#5c3b14",
                            minHeight: isMobile ? 44 : 52,
                            lineHeight: 1.3,
                            padding: isMobile ? "0 4px" : 0,
                          }}
                        >
                          {game.option}
                        </h3>

                        <p
                          style={{
                            color: "#000000",
                            fontSize: isMobile ? 15 : 14,
                            padding: isMobile ? "0 4px" : 0,
                          }}
                        >
                          {game.description}
                        </p>
                      </div>

                      <Button
                        disabled={isLocked || isCompleted}
                        block
                        style={{
                          borderRadius: 30,
                          height: isMobile ? 40 : 44,
                          fontSize: isMobile ? 15 : 14,
                          background:
                            isCompleted || isLocked ? "#d9d9d9" : game.gradient,
                          color:
                            isCompleted || isLocked ? "#000000" : "#ffffff",
                          border: "none",
                          boxShadow: `0 8px 16px ${game.color}60`,
                          transition: "all 0.3s ease",
                          touchAction: "manipulation",
                        }}
                        onTouchStart={(e) => {
                          if (!isLocked && !isCompleted && isMobile) {
                            e.currentTarget.style.transform = "scale(0.95)";
                          }
                        }}
                        onTouchEnd={(e) => {
                          if (!isLocked && !isCompleted && isMobile) {
                            e.currentTarget.style.transform = "scale(1)";
                          }
                        }}
                        onMouseEnter={(e) => {
                          if (!isLocked && !isCompleted && !isMobile) {
                            e.currentTarget.style.transform =
                              "translateY(-2px) scale(1.02)";
                            e.currentTarget.style.boxShadow = `0 12px 24px ${game.color}80`;
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isLocked && !isCompleted && !isMobile) {
                            e.currentTarget.style.transform =
                              "translateY(0) scale(1)";
                            e.currentTarget.style.boxShadow = `0 8px 16px ${game.color}60`;
                          }
                        }}
                      >
                        {isCompleted
                          ? isMobile
                            ? currentUi.completedMobile
                            : currentUi.completedDesktop
                          : isLocked
                            ? isMobile
                              ? currentUi.lockedMobile
                              : currentUi.lockedDesktop
                            : isMobile
                              ? currentUi.playButtonMobile
                              : currentUi.playButtonDesktop}
                      </Button>
                    </Card>
                  </div>
                </Col>
              );
            })}
          </Row>

          <img
            src={Dana}
            alt="Ada"
            className="card-lottery-deco"
            style={{
              top: 50,
              left: 30,
              width: 52,
              transform: "rotate(-12deg)",
              ["--duration"]: "7s",
            }}
          />

          <img
            src={Mega}
            alt="Mega"
            className="card-lottery-deco"
            style={{
              top: 1250,
              left: 20,
              width: 70,
              transform: "rotate(-12deg)",
              ["--duration"]: "7s",
            }}
          />

          <img
            src={Handa}
            alt="Handa"
            className="card-lottery-deco"
            style={{
              top: 1000,
              right: 20,
              width: 70,
              transform: "rotate(10deg)",
              ["--duration"]: "8s",
            }}
          />

          <img
            src={Govi}
            alt="Govi"
            className="card-lottery-deco"
            style={{
              top: 1550,
              right: 20,
              width: 70,
              transform: "rotate(-8deg)",
              ["--duration"]: "6.5s",
            }}
          />

          <img
            src={Maha}
            alt="Maha"
            className="card-lottery-deco"
            style={{
              top: 688,
              left: 10,
              width: 50,
              transform: "rotate(8deg)",
              ["--duration"]: "7.2s",
            }}
          />

          <img
            src={Jaya}
            alt="Maha"
            className="card-lottery-deco"
            style={{
              top: 350,
              right: 10,
              width: 50,
              transform: "rotate(8deg)",
              ["--duration"]: "7.2s",
            }}
          />

          {allGamesDone && (
            <BonusCard
              type={alreadyPlayed ? "USED" : "AVAILABLE"}
              isMobile={isMobile}
              currentUi={currentUi}
              onSpin={() => setShowBonus(true)}
            />
          )}

          <div
            className="games-card-animate"
            style={{
              textAlign: "center",
              marginTop: isMobile ? 30 : 40,
              marginBottom: isMobile ? 20 : 40,
              animationDelay: `${(data.length + 1) * 0.12 + 0.3}s`,
              padding: isMobile ? "0 10px" : 0,
            }}
          >
            <Card
              style={{
                maxWidth: isMobile ? "100%" : 450,
                margin: "0 auto",
                borderRadius: isMobile ? 20 : 30,
                border: "2px dashed #ff4d4f",
                background: "linear-gradient(135deg, #FFF1F0, #FFE6E6)",
                boxShadow: "0 20px 40px rgba(255,77,79,0.2)",
                backdropFilter: "blur(5px)",
              }}
              bodyStyle={{ padding: isMobile ? 20 : 24 }}
            >
              <h3
                style={{
                  color: "#a8071a",
                  fontSize: isMobile ? 20 : 22,
                  fontWeight: 800,
                  marginBottom: isMobile ? 8 : 12,
                }}
              >
                🛑{" "}
                {isMobile ? currentUi.sessionMobile : currentUi.sessionDesktop}
              </h3>

              <p
                style={{
                  color: "#555",
                  marginBottom: isMobile ? 16 : 20,
                  fontSize: isMobile ? 14 : 16,
                }}
              >
                {isMobile
                  ? currentUi.sessionDescMobile
                  : currentUi.sessionDescDesktop}
              </p>

              <Button
                danger
                size={isMobile ? "middle" : "large"}
                onClick={handleEndSession}
                style={{
                  borderRadius: 30,
                  height: isMobile ? 44 : 48,
                  padding: isMobile ? "0 24px" : "0 32px",
                  fontWeight: "bold",
                  fontSize: isMobile ? 14 : 16,
                  background: "linear-gradient(135deg, #ff4d4f, #cf1322)",
                  border: "none",
                  boxShadow: "0 15px 30px rgba(207,19,34,0.3)",
                  transition: "all 0.3s ease",
                  width: isMobile ? "100%" : "auto",
                  touchAction: "manipulation",
                }}
                onTouchStart={(e) => {
                  if (isMobile) {
                    e.currentTarget.style.transform = "scale(0.95)";
                  }
                }}
                onTouchEnd={(e) => {
                  if (isMobile) {
                    e.currentTarget.style.transform = "scale(1)";
                  }
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform =
                      "translateY(-3px) scale(1.02)";
                    e.currentTarget.style.boxShadow =
                      "0 20px 40px rgba(207,19,34,0.4)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow =
                      "0 15px 30px rgba(207,19,34,0.3)";
                  }
                }}
              >
                {isMobile
                  ? currentUi.endSessionMobile
                  : currentUi.endSessionDesktop}
              </Button>
            </Card>
          </div>
        </div>
      </div>
      <BonusSpinModal
        open={showBonus}
        player={player}
        onClose={() => setShowBonus(false)}
      />
      <FinalRewardModal
        open={finalRewardModal}
        alreadyPlayed={alreadyPlayed}
        onClose={() => setFinalRewardModal(false)}
        onSpin={() => setShowBonus(true)}
      />
    </>
  );
}

const styles = {
  rewardBadge: {
    background: "rgba(255, 215, 0, 0.15)",
    padding: "8px 16px",
    borderRadius: 30,
    display: "flex",
    alignItems: "center",
    fontSize: 14,
    color: "#8B4513",
    border: "1px solid rgba(255, 215, 0, 0.3)",
  },
};
