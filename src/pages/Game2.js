import { Card, Button } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircleOutlined,
  TrophyOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import kavumImg from "../assets/kavum-jar.png";
import { useLanguage } from "../context/LanguageContext";
import WINWAYLogo from "../assets/WIN WAY English Logo- PNG.png";
import AwuruduGames from "../assets/Aluth Awurudu Games.png";
// API
import { submitKavumCountGame } from "../api/gameApi";
import NextQuestionLoader from "../components/NextQuestionLoader";

export default function Game2({ player }) {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const [selected, setSelected] = useState(null);
  const [animateIn, setAnimateIn] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [imageHover, setImageHover] = useState(false);
  const [loadingNext, setLoadingNext] = useState(false);

  const [finished, setFinished] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [timeTaken, setTimeTaken] = useState("0.00");
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
    setLoadingNext(false);

    // ✅ all completed
    navigate("/"); // or show bonus modal
  };

  const text = {
    si: {
      title: "කැවුම් ගණන හොයමු",
      question: "රූපයේ ඇති කැවුම් ගණන කීයද?",
      back: "ආපසු",
      submit: "පිළිතුර යවන්න",
      correct: "පිළිතුර නිවැරදියි",
      wrong: "පිළිතුර වැරදියි",
      answerCount: "කැවුම් ගණන",
      timeTaken: "ගතවූ කාලය",
      playAgain: "නැවත ක්‍රීඩා කරන්න",
      goHome: "මුල් පිටුවට යන්න",
      guest: "Guest",
      notAvailable: "N/A",
    },
    ta: {
      title: "கவ்வும் எண்ணிக்கையை கண்டுபிடிப்போம்",
      question: "படத்தில் உள்ள கவ்வும் எண்ணிக்கை எவ்வளவு?",
      back: "பின்னுக்கு",
      submit: "பதிலை அனுப்பவும்",
      correct: "பதில் சரியானது",
      wrong: "பதில் தவறானது",
      answerCount: "கவ்வும் எண்ணிக்கை",
      timeTaken: "எடுத்த நேரம்",
      playAgain: "மீண்டும் விளையாடுங்கள்",
      goHome: "முகப்பு பக்கத்துக்கு செல்லவும்",
      guest: "Guest",
      notAvailable: "N/A",
    },
  };

  const t = text[language] || text.si;

  const options = ["6", "7", "8", "9"];
  const correctAnswer = "8";

  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    setTimeout(() => setAnimateIn(true), 80);
    setStartTime(Date.now());
  }, []);

  useEffect(() => {
    const styleId = "game2-warm-style";
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
          filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.3));
        }
        50% {
          filter: drop-shadow(0 0 25px rgba(255, 215, 0, 0.6));
        }
      }

      @keyframes flicker {
        0%, 100% {
          opacity: 1;
          transform: scale(1);
        }
        25% {
          opacity: 0.8;
          transform: scale(0.95);
        }
        50% {
          opacity: 1;
          transform: scale(1.05);
        }
        75% {
          opacity: 0.9;
          transform: scale(0.98);
        }
      }

      .game-card {
        animation: floatIn 0.7s ease forwards;
      }

      .option-button {
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }

      .option-button:hover:not(:disabled) {
        transform: translateY(-3px) scale(1.02);
        box-shadow: 0 12px 24px rgba(255, 215, 0, 0.3);
      }

      .floating-element {
        position: absolute;
        pointer-events: none;
        opacity: 0.5;
        animation: gentleFloat var(--duration) ease-in-out infinite;
        animation-delay: var(--delay);
        filter: drop-shadow(0 0 5px rgba(255, 215, 0, 0.3));
      }

      .image-container {
        position: relative;
        overflow: hidden;
        border-radius: 20px;
      }

      .image-container::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 255, 255, 0.3),
          transparent
        );
        transition: left 0.5s ease;
      }

      .image-container:hover::after {
        left: 100%;
      }

      .pulse-glow {
        animation: pulseGlow 2s ease-in-out infinite;
      }

      .flicker {
        animation: flicker 3s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
  }, []);

  const handleFinish = async () => {
    if (submitting || !selected) return;

    setSubmitting(true);

    const finishTime = Date.now();
    const totalTime = ((finishTime - startTime) / 1000).toFixed(2);

    const answerCorrect = selected === correctAnswer;
    const score = answerCorrect ? 1 : 0;

    const payload = {
      name: player?.name || t.guest,
      phone: player?.phone || t.notAvailable,
      selectedAnswer: selected,
      correctAnswer,
      isCorrect: answerCorrect,
      score,
      time: totalTime,
    };

    try {
      const res = await submitKavumCountGame(payload);

      if (res?.success) {
        // ✅ Get existing progress
        const existing = JSON.parse(
          localStorage.getItem("gamesPlayed") || "{}",
        );

        // ✅ Update Kavum Count
        existing["kavum_count"] = {
          completed: true,
          score,
          isCorrect: answerCorrect,
          time: totalTime,
          selectedAnswer: selected,
          correctAnswer,
          completedAt: new Date().toISOString(),
        };

        // ✅ Save back
        localStorage.setItem("gamesPlayed", JSON.stringify(existing));
      }
    } catch (err) {
      console.log("Save failed");
    }
      setTimeout(() => {
        setLoadingNext(true);
      }, 6000);
      setTimeout(() => {
        handleNext();
      }, 10000);
    setIsCorrect(answerCorrect);
    setFinalScore(score);
    setTimeTaken(totalTime);
    setFinished(true);
    setSubmitting(false);
  };

  const handleSubmit = () => {
    if (!selected) return;
    handleFinish();
  };

  const restartGame = () => {
    setSelected(null);
    setFinished(false);
    setIsCorrect(false);
    setFinalScore(0);
    setTimeTaken("0.00");
    setSubmitting(false);
    setStartTime(Date.now());
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 30% 30%, #FFE4B5, #DEB887, #8B4513)",
        padding: "30px 16px",
        opacity: animateIn ? 1 : 0,
        transition: "all 0.5s ease",
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

      <div
        className="floating-element"
        style={{
          top: "10%",
          left: "5%",
          fontSize: 48,
          "--duration": "12s",
          "--delay": "0s",
        }}
      >
        🪔
      </div>

      <div
        className="floating-element flicker"
        style={{
          top: "80%",
          right: "5%",
          fontSize: 36,
          "--duration": "15s",
          "--delay": "2s",
        }}
      >
        🌸
      </div>

      <div
        className="floating-element"
        style={{
          top: "20%",
          right: "15%",
          fontSize: 42,
          "--duration": "10s",
          "--delay": "1s",
        }}
      >
        🏮
      </div>

      <div
        className="floating-element flicker"
        style={{
          bottom: "15%",
          left: "10%",
          fontSize: 40,
          "--duration": "14s",
          "--delay": "3s",
        }}
      >
        🍘
      </div>

      <div
        className="floating-element"
        style={{
          top: "30%",
          right: "25%",
          fontSize: 32,
          "--duration": "11s",
          "--delay": "1.5s",
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
          <NextQuestionLoader
            visible={loadingNext}
            text="Next question loading..."
          />
          {!finished ? (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                style={{
                  background: "linear-gradient(135deg, #FFF8E7, #FFEBCD)",
                  border: "2px solid #FFD700",
                  borderRadius: 24,
                  padding: "20px 18px",
                  marginBottom: 20,
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    color: "#5c3b14",
                    fontSize: 17,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                  }}
                >
                  {t.question}
                </h3>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="image-container"
                style={{
                  background: "linear-gradient(135deg, #FFF8E7, #FFE4B5)",
                  border: "3px solid #FFD700",
                  borderRadius: 24,
                  padding: 12,
                  marginBottom: 24,
                  boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                }}
                onMouseEnter={() => setImageHover(true)}
                onMouseLeave={() => setImageHover(false)}
              >
                <img
                  src={kavumImg}
                  alt="kavum"
                  style={{
                    width: "100%",
                    borderRadius: 16,
                    transform: imageHover ? "scale(1.05)" : "scale(1)",
                    transition:
                      "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    boxShadow: imageHover
                      ? "0 20px 40px rgba(139,69,19,0.3)"
                      : "none",
                  }}
                />
              </motion.div>

              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {options.map((opt, i) => {
                  const isActive = selected === opt;

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                    >
                      <Button
                        className="option-button"
                        block
                        onClick={() => setSelected(opt)}
                        style={{
                          height: 60,
                          borderRadius: 15,
                          fontWeight: 600,
                          fontSize: 14,
                          transition: "all 0.3s ease",
                          transform: isActive ? "scale(1.02)" : "scale(1)",
                          border: isActive
                            ? "3px solid #FFD700"
                            : "2px solid #f0f0f0",
                          background: isActive
                            ? "linear-gradient(135deg, #FFF9E6, #FFE4B5)"
                            : "white",
                          color: isActive ? "#8B4513" : "#666",
                          boxShadow: isActive
                            ? "0 15px 30px rgba(255,215,0,0.3)"
                            : "0 8px 15px rgba(0,0,0,0.05)",
                        }}
                      >
                        <TrophyOutlined style={{ marginRight: 8 }} />
                        {opt}
                      </Button>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                style={{
                  marginTop: 28,
                  display: "flex",
                  gap: 12,
                }}
              >
                <Button
                  onClick={() => navigate("/")}
                  style={{
                    height: 56,
                    borderRadius: 30,
                    border: "2px solid #d41717",
                    background: "linear-gradient(135deg, #FFF8E1, #d41717b7)",
                    color: "#554646",
                    fontWeight: 700,
                    fontSize: 15,
                    boxShadow: "0 10px 20px rgba(212,160,23,0.18)",
                    transition: "all 0.3s ease",
                  }}
                >
                  {t.back}
                </Button>

                <Button
                  type="primary"
                  block
                  disabled={!selected || submitting}
                  loading={submitting}
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
                    transition: "all 0.3s ease",
                    color: selected ? "white" : "#999",
                  }}
                >
                  <CheckCircleOutlined /> {t.submit}
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
                    background: isCorrect
                      ? "linear-gradient(135deg, #F1FFF3, #DDF7E5)"
                      : "linear-gradient(135deg, #FFF3F3, #FFE0E0)",
                    border: isCorrect
                      ? "3px solid #2ECC71"
                      : "3px solid #FF4D4F",
                    boxShadow: isCorrect
                      ? "0 18px 40px rgba(46, 204, 113, 0.18)"
                      : "0 18px 40px rgba(255, 77, 79, 0.18)",
                    borderRadius: 24,
                    padding: "22px 18px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 20,
                    }}
                  >
                    <div
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: isCorrect
                          ? "linear-gradient(135deg, #E8FFF1, #C8F7DC)"
                          : "linear-gradient(135deg, #FFF1F1, #FFD6D6)",
                        boxShadow: isCorrect
                          ? "0 14px 30px rgba(46, 204, 113, 0.22)"
                          : "0 14px 30px rgba(255, 77, 79, 0.22)",
                        marginBottom: isCorrect ? 12 : 20,
                      }}
                    >
                      {isCorrect ? (
                        <CheckCircleOutlined
                          style={{
                            fontSize: 100,
                            color: "#1E8449",
                          }}
                        />
                      ) : (
                        <CloseCircleOutlined
                          style={{
                            fontSize: 100,
                            color: "#C62828",
                          }}
                        />
                      )}
                    </div>

                    {isCorrect && (
                      <div
                        style={{
                          fontSize: 24,
                          fontWeight: 800,
                          color: "#1E8449",
                          marginBottom: 10,
                          lineHeight: 1.3,
                        }}
                      >
                        {t.correct}
                      </div>
                    )}
                    {!isCorrect && (
                      <div
                        style={{
                          fontSize: 24,
                          fontWeight: 800,
                          color: "#C62828",
                          marginBottom: 10,
                          lineHeight: 1.3,
                        }}
                      >
                        {t.wrong}
                      </div>
                    )}
                  </div>

                  <div
                    style={{
                      fontSize: 24,
                      fontWeight: 800,
                      color: isCorrect ? "#1E8449" : "#C62828",
                      marginBottom: 20,
                      lineHeight: 1.3,
                    }}
                  >
                    {t.answerCount} {correctAnswer}
                  </div>

                  {isCorrect && (
                    <div
                      style={{
                        maxWidth: 260,
                        margin: "0 auto 20px",
                        background: "linear-gradient(135deg, #E8F5E9, #C8E6C9)",
                        padding: "18px",
                        borderRadius: 20,
                        boxShadow: "0 10px 24px rgba(46, 125, 50, 0.12)",
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
                  )}

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
                        background: "linear-gradient(135deg, #27AE60, #2ECC71)",
                        border: "none",
                        color: "white",
                        boxShadow: "0 10px 20px rgba(39,174,96,0.3)",
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
                        background: "linear-gradient(135deg, #27AE60, #2ECC71)",
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
        </Card>
      </motion.div>
    </div>
  );
}
