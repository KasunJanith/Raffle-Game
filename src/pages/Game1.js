import { Card, Button } from "antd";
import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrophyOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import WINWAYLogo from "../assets/WIN WAY English Logo- PNG.png";
import { submitQuizGame } from "../api/gameApi";
import { useLanguage } from "../context/LanguageContext";
import AwuruduGames from "../assets/Aluth Awurudu Games.png";
import { getNextGameRoute } from "../utils/gameFlow.js"; // or same file
import GameCountdown from "../components/GameCountdown.js";
import NextQuestionLoader from "../components/NextQuestionLoader.js";

export default function Game1({ player }) {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const { language } = useLanguage();

  const questionBank = {
    si: [
      {
        question: "මල් වැනි හැඩයක් ඇති අවුරුදු කැවිලි කුමක්ද?",
        options: ["කොකිස්", "කැවුම්", "අලුවා", "අග්ගලා"],
        answer: "කොකිස්",
      },
      {
        question: "අවුරුදු ආරම්භයේදී කරන්නේ කුමක්ද?",
        options: [
          "ටීවී බලනවා",
          "ලිප ගිනි දමා කිරි බත් උයනවා",
          "වෙළඳසල් යනවා",
          "රැකියාවට යනවා",
        ],
        answer: "ලිප ගිනි දමා කිරි බත් උයනවා",
      },
      {
        question: "මේවා අතරින් අවුරුදු ක්‍රීඩාවක් වන්නේ කුමක්ද?",
        options: ["ක්‍රිකට්", "කණා මුට්ටි", "පාපන්දු", "චෙස්"],
        answer: "කණා මුට්ටි",
      },
      {
        question: "අවුරුදු සමයේ වැඩිපුරම සාදන බත් වර්ගය කුමක්ද?",
        options: ["පොල් බත්", "කිරි බත්", "බිරියානි", "ලෙමන් රයිස්"],
        answer: "කිරි බත්",
      },
    ],
    ta: [
      {
        question: "மலர் போன்ற வடிவம் கொண்ட புத்தாண்டு இனிப்பு எது?",
        options: ["கொக்கிஸ்", "கவ்வும்", "அலுவா", "அக்கலா"],
        answer: "கொக்கிஸ்",
      },
      {
        question: "புத்தாண்டு தொடக்கத்தில் என்ன செய்கிறார்கள்?",
        options: [
          "டிவி பார்க்கிறார்கள்",
          "அடுப்பை ஏற்றி பால் சோறு சமைக்கிறார்கள்",
          "கடைக்கு செல்கிறார்கள்",
          "வேலைக்கு செல்கிறார்கள்",
        ],
        answer: "அடுப்பை ஏற்றி பால் சோறு சமைக்கிறார்கள்",
      },
      {
        question: "இவற்றில் புத்தாண்டு விளையாட்டு எது?",
        options: ["கிரிக்கெட்", "கணா முட்டி", "கால்பந்து", "சதுரங்கம்"],
        answer: "கணா முட்டி",
      },
      {
        question: "புத்தாண்டு காலத்தில் அதிகம் தயாரிக்கப்படும் சாதம் எது?",
        options: ["தேங்காய் சாதம்", "பால் சோறு", "பிரியாணி", "எலுமிச்சை சாதம்"],
        answer: "பால் சோறு",
      },
    ],
  };

  const uiText = {
    si: {
      title: "අවුරුදු ප්‍රශ්න මාලාව",
      questionLabel: "ප්‍රශ්නය",
      previous: "පෙර",
      back: "ආපසු",
      next: "ඊළඟ",
      finish: "අවසන් කරන්න",
      gameOver: "ක්‍රීඩාව අවසන්!",
      yourScore: "ඔබගේ ලකුණු",
      timeTaken: "ගතවූ කාලය",
      answerReview: "නිවැරදි පිළිතුරු සහ ඔබගේ පිළිතුරු",
      correctAnswer: "නිවැරදි පිළිතුර:",
      yourAnswer: "ඔබගේ පිළිතුර:",
      yourAnswerCorrect: "ඔබගේ පිළිතුර නිවැරදිය:",
      playAgain: "නැවත ක්‍රීඩා කරන්න",
      goHome: "මුල් පිටුවට යන්න",
    },
    ta: {
      title: "புத்தாண்டு வினாடி வினா",
      questionLabel: "கேள்வி",
      previous: "முந்தையது",
      back: "பின்னுக்கு",
      next: "அடுத்து",
      finish: "முடிக்கவும்",
      gameOver: "விளையாட்டு முடிந்தது!",
      yourScore: "உங்கள் மதிப்பெண்",
      timeTaken: "எடுத்த நேரம்",
      answerReview: "சரியான பதில்கள் மற்றும் உங்கள் பதில்கள்",
      correctAnswer: "சரியான பதில்:",
      yourAnswer: "உங்கள் பதில்:",
      yourAnswerCorrect: "உங்கள் பதில் சரியானது:",
      playAgain: "மீண்டும் விளையாடுங்கள்",
      goHome: "முகப்பு பக்கத்துக்கு செல்லவும்",
    },
  };

  const questions = useMemo(
    () => questionBank[language] || questionBank.si,
    [language],
  );
  const t = uiText[language] || uiText.si;

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [startTime, setStartTime] = useState(null);

  const [finished, setFinished] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [timeTaken, setTimeTaken] = useState("0.00");

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

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
  const games = [
    { key: "game_quiz_done", route: "/game1" },
    { key: "game_kavum_done", route: "/game2" },
    { key: "game_lamps_done", route: "/game3" },
    { key: "game_rabana_done", route: "/rabana" },
    { key: "game_catch_kavum_done", route: "/kavum" },
    { key: "game_break_pot_done", route: "/break" },
  ];
  useEffect(() => {
    const styleId = "game1-festival-animations";
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

      .question-card {
        animation: floatIn 0.6s ease forwards;
      }

      .option-button {
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }

      .option-button:hover:not(:disabled) {
        transform: translateX(5px) scale(1.02);
      }

      .floating-element {
        position: absolute;
        pointer-events: none;
        opacity: 0.4;
        animation: gentleFloat var(--duration) ease-in-out infinite;
        animation-delay: var(--delay);
        filter: drop-shadow(0 0 5px rgba(255, 215, 0, 0.2));
      }
    `;
    document.head.appendChild(style);
  }, []);

  const handleSelect = (opt) => {
    if (finished) return;
    setSelected(opt);
  };

  const handleSubmit = async () => {
    if (!selected) return;

    const currentQ = questions[current];

    const updatedAnswers = [
      ...answers,
      {
        question: currentQ.question,
        selected,
        correct: currentQ.answer,
        isCorrect: selected === currentQ.answer,
      },
    ];

    if (current + 1 < questions.length) {
      setAnswers(updatedAnswers);
      setCurrent((prev) => prev + 1);
      setSelected(null);
    } else {
      await handleFinish(updatedAnswers);
    }
  };

  const handleFinish = async (finalAnswers) => {
    const finishTime = Date.now();
    const totalTime = ((finishTime - startTime) / 1000).toFixed(2);
    const score = finalAnswers.filter((a) => a.isCorrect).length;

    setAnswers(finalAnswers);
    setFinalScore(score);
    setTimeTaken(totalTime);
    setFinished(true);

    const payload = {
      name: player?.name || "Guest",
      phone: player?.phone || "N/A",
      score,
      time: totalTime,
      totalQuestions: questions.length,
      answers: finalAnswers,
    };

    try {
      const res = await submitQuizGame(payload);

      if (res?.success) {
        // ✅ Get existing progress
        const existing = JSON.parse(
          localStorage.getItem("gamesPlayed") || "{}",
        );

        // ✅ Update Quiz
        existing["quiz"] = {
          completed: true,
          score,
          time: totalTime,
          totalQuestions: questions.length,
          completedAt: new Date().toISOString(),
        };

        // ✅ Save back
        localStorage.setItem("gamesPlayed", JSON.stringify(existing));
      }
      setCountdownStart(true);
      console.log("Saved");
      setTimeout(() => {
        setLoadingNext(true);
      }, 10000);
      setTimeout(() => {
        handleNext();
      }, 16000);
    } catch (err) {
      console.log("Save failed");
    }
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
    setLoadingNext(false);
    // ✅ all completed
    console.log(progress);

    // ✅ all completed
    navigate("/"); // or show bonus modal
  };

  const handleBack = () => {
    if (current > 0) {
      const newAnswers = [...answers];
      newAnswers.pop();

      setCurrent((prev) => prev - 1);
      setAnswers(newAnswers);
      setSelected(answers[current - 1]?.selected || null);
    } else {
      navigate("/");
    }
  };
  const [startClicked, setStartClicked] = useState(false);
  const [countdownStart, setCountdownStart] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const q = questions[current];
  const progress = finished ? 100 : ((current + 1) / questions.length) * 100;
  const [loadingNext, setLoadingNext] = useState(false);
  return (
    <div
      ref={containerRef}
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 30% 30%, #FFE4B5, #DEB887, #8B4513)",
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
              rgba(255, 215, 0, 0.05) 0px,
              rgba(255, 215, 0, 0.05) 20px,
              rgba(210, 105, 30, 0.05) 20px,
              rgba(210, 105, 30, 0.05) 40px
            )
          `,
          animation: "spinSlow 60s linear infinite",
          pointerEvents: "none",
        }}
      />
      <NextQuestionLoader
        visible={loadingNext}
        text="Next question loading..."
      />
      <div
        className="floating-element"
        style={{
          top: "10%",
          left: "5%",
          fontSize: 44,
          "--duration": "12s",
          "--delay": "0s",
          transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`,
        }}
      >
        🌸
      </div>

      <div
        className="floating-element"
        style={{
          bottom: "10%",
          right: "8%",
          fontSize: 38,
          "--duration": "10s",
          "--delay": "1s",
          transform: `translate(${mousePosition.x * 0.4}px, ${mousePosition.y * 0.4}px)`,
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
          maxWidth: 720,
          position: "relative",
          zIndex: 10,
        }}
      >
        <Card
          style={{
            borderRadius: 32,
            background: "rgba(255, 255, 255, 0.97)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 30px 60px rgba(139, 69, 19, 0.25)",
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
            }}
          >
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
                margin: "12px 0 16px",
                color: "#8B4513",
                fontSize: 20,
                fontWeight: 800,
                textAlign: "center",
                background: "linear-gradient(135deg, #8B4513, #D2691E)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {t.title}
            </h2>
          </div>

          {!finished ? (
            <>
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                >
                  <div
                    className="question-card"
                    style={{
                      background: "linear-gradient(135deg, #FFF8E7, #FFEBCD)",
                      border: "2px solid #FFD700",
                      borderRadius: 24,
                      padding: "24px 20px",
                      marginBottom: 24,
                      boxShadow: "inset 0 2px 10px rgba(0,0,0,0.02)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#A66B00",
                        marginBottom: 10,
                      }}
                    >
                      {t.questionLabel} {current + 1} / {questions.length}
                    </div>

                    <h3
                      style={{
                        margin: 0,
                        color: "#5c3b14",
                        fontSize: 16,
                        lineHeight: 1.6,
                        fontWeight: 700,
                      }}
                    >
                      {q.question}
                    </h3>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                    }}
                  >
                    {q.options.map((opt, i) => (
                      <motion.div
                        key={opt}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Button
                          className="option-button"
                          block
                          onClick={() => handleSelect(opt)}
                          style={{
                            height: 60,
                            borderRadius: 20,
                            fontWeight: 600,
                            fontSize: 14,
                            border:
                              selected === opt
                                ? "3px solid #FFD700"
                                : "2px solid #f0f0f0",
                            background:
                              selected === opt
                                ? "linear-gradient(135deg, #FFF9E6, #FFE4B5)"
                                : "white",
                            color: selected === opt ? "#8B4513" : "#666",
                            boxShadow:
                              selected === opt
                                ? "0 10px 20px rgba(255,215,0,0.2)"
                                : "0 5px 15px rgba(0,0,0,0.05)",
                            transition: "all 0.3s ease",
                          }}
                        >
                          {opt}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                style={{
                  marginTop: 28,
                  display: "flex",
                  gap: 12,
                }}
              >
                <Button
                  onClick={handleBack}
                  style={{
                    height: 56,
                    borderRadius: 30,
                    border: "2px solid #d41717",
                    background: "linear-gradient(135deg, #FFF8E1, #d41717b7)",
                    color: "#554646",
                    fontWeight: 700,
                    fontSize: 15,
                    boxShadow: "0 10px 20px rgba(212,160,23,0.18)",
                  }}
                >
                  {current > 0 ? t.previous : t.back}
                </Button>

                <Button
                  type="primary"
                  block
                  disabled={!selected}
                  onClick={handleSubmit}
                  style={{
                    height: 56,
                    borderRadius: 30,
                    background: selected
                      ? "linear-gradient(135deg, #27AE60, #2ECC71)"
                      : "#f0f0f0",
                    border: "none",
                    fontWeight: 800,
                    fontSize: 15,
                    boxShadow: selected
                      ? "0 15px 30px rgba(39,174,96,0.3)"
                      : "none",
                    color: selected ? "white" : "#999",
                  }}
                >
                  {current + 1 === questions.length ? t.finish : t.next}
                </Button>
              </motion.div>
            </>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div
                  style={{
                    background: "linear-gradient(135deg, #FFF9E6, #FFE4B5)",
                    border: "3px solid #FFD700",
                    borderRadius: 24,
                    padding: "22px 18px",
                    marginTop: 16,
                    textAlign: "center",
                    marginBottom: 20,
                  }}
                >
                  <h2
                    style={{
                      color: "#8B4513",
                      fontSize: 28,
                      marginBottom: 18,
                      fontWeight: 800,
                    }}
                  >
                    {t.gameOver}
                  </h2>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(180px, 1fr))",
                      gap: 12,
                      marginBottom: 20,
                    }}
                  >
                    <div
                      style={{
                        background: "linear-gradient(135deg, #FFD700, #FFA500)",
                        padding: "18px",
                        borderRadius: 20,
                      }}
                    >
                      <div
                        style={{
                          color: "#8B4513",
                          fontSize: 14,
                          marginBottom: 6,
                          fontWeight: 700,
                        }}
                      >
                        <TrophyOutlined /> {t.yourScore}
                      </div>
                      <div
                        style={{
                          color: "#8B4513",
                          fontSize: 36,
                          fontWeight: 800,
                        }}
                      >
                        {finalScore} / {questions.length}
                      </div>
                    </div>

                    <div
                      style={{
                        background: "linear-gradient(135deg, #E8F5E9, #C8E6C9)",
                        padding: "18px",
                        borderRadius: 20,
                      }}
                    >
                      <div
                        style={{
                          color: "#2E7D32",
                          fontSize: 14,
                          marginBottom: 6,
                          fontWeight: 700,
                        }}
                      >
                        <ClockCircleOutlined /> {t.timeTaken}
                      </div>
                      <div
                        style={{
                          color: "#2E7D32",
                          fontSize: 30,
                          fontWeight: 800,
                        }}
                      >
                        {timeTaken}s
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      textAlign: "left",
                      marginTop: 12,
                    }}
                  >
                    <h3
                      style={{
                        color: "#8B4513",
                        marginBottom: 14,
                        fontSize: 18,
                        fontWeight: 800,
                        textAlign: "center",
                      }}
                    >
                      {t.answerReview}
                    </h3>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 14,
                      }}
                    >
                      {answers.map((item, index) => (
                        <div
                          key={index}
                          style={{
                            background: item.isCorrect
                              ? "linear-gradient(135deg, #F1FFF3, #E0F7E9)"
                              : "linear-gradient(135deg, #FFF5F5, #FFE3E3)",
                            border: item.isCorrect
                              ? "2px solid #4CAF50"
                              : "2px solid #FF6B6B",
                            borderRadius: 18,
                            padding: 16,
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                              marginBottom: 8,
                              fontWeight: 800,
                              color: "#5c3b14",
                            }}
                          >
                            {item.isCorrect ? (
                              <CheckCircleOutlined
                                style={{ color: "#2E7D32" }}
                              />
                            ) : (
                              <CloseCircleOutlined
                                style={{ color: "#D32F2F" }}
                              />
                            )}
                            {t.questionLabel} {index + 1}
                          </div>

                          <div
                            style={{
                              marginBottom: 10,
                              color: "#5c3b14",
                              fontWeight: 700,
                              lineHeight: 1.6,
                            }}
                          >
                            {item.question}
                          </div>

                          {item.correct !== item.selected && (
                            <div style={{ color: "#555" }}>
                              <div
                                style={{
                                  color: item.isCorrect ? "#2E7D32" : "#D32F2F",
                                  fontWeight: 600,
                                  marginBottom: 10,
                                }}
                              >
                                <strong>{t.correctAnswer}</strong>{" "}
                                {item.correct}
                              </div>

                              <div
                                style={{
                                  color: item.isCorrect ? "#2E7D32" : "#D32F2F",
                                  fontWeight: 600,
                                }}
                              >
                                <strong>{t.yourAnswer}</strong> {item.selected}
                              </div>
                            </div>
                          )}

                          {item.correct === item.selected && (
                            <div
                              style={{
                                color: item.isCorrect ? "#2E7D32" : "#D32F2F",
                                fontWeight: 600,
                              }}
                            >
                              <strong>{t.yourAnswerCorrect}</strong>{" "}
                              {item.selected}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* <div
                    style={{
                      display: "flex",
                      gap: 12,
                      marginTop: 24,
                      flexWrap: "wrap",
                      justifyContent: "space-between",
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

                    <Button
                      onClick={() => handleNext()}
                      style={{
                        height: 48,
                        padding: "0 32px",
                        borderRadius: 30,
                        fontWeight: 700,
                        fontSize: 16,
                        background: "linear-gradient(135deg, #27AE60, #2ECC71)", // 🟢 GREEN (primary)
                        border: "none",
                        color: "white",
                        boxShadow: "0 10px 20px rgba(39,174,96,0.3)",
                      }}
                    >
                      Next Question
                    </Button>
                  </div> */}
                </div>
              </motion.div>
            </AnimatePresence>
          )}

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
              🌟
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
              🌸
            </span>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
