import { Card, Input, Button, message, Segmented, Slider } from "antd";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  UserOutlined,
  PhoneOutlined,
  SafetyOutlined,
  GlobalOutlined,
  SoundOutlined,
  AudioMutedOutlined,
} from "@ant-design/icons";
import { useLanguage } from "../context/LanguageContext";
import "./Welcome.css";
import WINWAYLogo from "../assets/WIN WAY English Logo- PNG.png";
import AwuruduGames from "../assets/Aluth Awurudu Games.png";
import Ada from "../assets/All lotteries/Ada Sampatha - Fri.jpg";
import Dana from "../assets/All lotteries/DN- FRI.png";
import Govi from "../assets/All lotteries/GS- FRI.png";
import Handa from "../assets/All lotteries/H- SAT.png";
import Mega from "../assets/All lotteries/MP- WED.png";
import Maha from "../assets/All lotteries/MS- FRI.png";
import Jaya from "../assets/All lotteries/Jaya - Fri.jpg";
import { useAudio } from "../context/AudioContext";
import { checkOrLoginPlayer } from "../api/gameApi";
export default function Welcome({ setPlayer }) {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const { language, changeLanguage, t } = useLanguage();

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [nameFocused, setNameFocused] = useState(false);
  const [mobileFocused, setMobileFocused] = useState(false);
  const { isMuted, toggleMute, volume, setVolume } = useAudio();
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 12,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 12,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("player");

      if (!saved) return;

      const data = typeof saved === "string" ? JSON.parse(saved) : saved;

      setName(data?.name || "");
      setMobile(data?.phone || data?.mobile || "");
    } catch (err) {
      console.error("Invalid player data, clearing...");
      localStorage.removeItem("player");
    }
  }, []);

  useEffect(() => {
    const styleId = "welcome-festival-animations";
    if (document.getElementById(styleId)) return;

    const style = document.createElement("style");
    style.id = styleId;
    style.innerHTML = `
      @keyframes floatIn {
        0% {
          opacity: 0;
          transform: translateY(30px) scale(0.94);
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

      @keyframes shimmer {
        0% {
          background-position: -1000px 0;
        }
        100% {
          background-position: 1000px 0;
        }
      }

      @keyframes floatLottery {
        0% {
          transform: translateY(0px) rotate(0deg);
          opacity: 1;
        }
        50% {
          transform: translateY(-10px) rotate(3deg);
          opacity: 1;
        }
        100% {
          transform: translateY(0px) rotate(0deg);
          opacity: 1;
        }
      }

      @keyframes softBlink {
        0%, 100% {
          opacity: 0.35;
          transform: scale(1);
        }
        50% {
          opacity: 0.85;
          transform: scale(1.08);
        }
      }

      @keyframes cardGlow {
        0%, 100% {
          box-shadow: 0 24px 60px rgba(139, 69, 19, 0.22);
        }
        50% {
          box-shadow: 0 30px 70px rgba(255, 180, 0, 0.20);
        }
      }

      .welcome-container {
        min-height: 100vh;
        padding: 26px 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        overflow: hidden;
        background:
          radial-gradient(circle at 15% 20%, rgba(255, 215, 0, 0.20), transparent 20%),
          radial-gradient(circle at 85% 18%, rgba(255, 105, 180, 0.16), transparent 18%),
          radial-gradient(circle at 30% 85%, rgba(255, 165, 0, 0.14), transparent 20%),
          radial-gradient(circle at 75% 82%, rgba(255, 230, 150, 0.12), transparent 20%),
          linear-gradient(135deg, #b3123f 0%, #d81b60 35%, #f44336 65%, #ff9800 100%);
      }

      .welcome-container::before {
        content: "";
        position: absolute;
        inset: 0;
        background:
          repeating-linear-gradient(
            45deg,
            rgba(255,255,255,0.025) 0px,
            rgba(255,255,255,0.025) 12px,
            transparent 12px,
            transparent 24px
          );
        pointer-events: none;
      }

      .welcome-card {
        animation: floatIn 0.8s ease forwards, cardGlow 4s ease-in-out infinite;
        background: rgba(255, 248, 240, 0.965) !important;
        backdrop-filter: blur(10px) !important;
        border: 3px solid #FFD700 !important;
        border-radius: 40px !important;
        max-width: 500px;
        width: 100%;
        position: relative;
        overflow: hidden;
        z-index: 2;
      }

      .welcome-input {
        height: 56px !important;
        border-radius: 30px !important;
        border: 2px solid #FFD700 !important;
        padding: 0 24px !important;
        font-size: 16px !important;
        transition: all 0.3s ease !important;
        background: white !important;
      }

      .welcome-input:hover {
        border-color: #FFA500 !important;
        box-shadow: 0 10px 20px rgba(255, 215, 0, 0.16) !important;
      }

      .welcome-input:focus {
        border-color: #FFD700 !important;
        box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.22) !important;
      }

      .start-btn {
        height: 56px !important;
        border-radius: 30px !important;
        font-weight: 700 !important;
        font-size: 18px !important;
        background: linear-gradient(135deg, #27AE60, #2ECC71) !important;
        border: none !important;
        box-shadow: 0 15px 30px rgba(39, 174, 96, 0.28) !important;
        transition: all 0.3s ease !important;
      }

      .start-btn:hover {
        transform: translateY(-3px) scale(1.02) !important;
        box-shadow: 0 20px 40px rgba(39, 174, 96, 0.38) !important;
      }

      .start-btn:active {
        transform: translateY(1px) scale(0.985) !important;
      }

      .title-shimmer {
        background: linear-gradient(
          90deg,
          #c96a18,
          #f0a543,
          #f6cc2c,
          #ffb300,
          #f0a543,
          #c96a18
        );
        background-size: 200% 100%;
        animation: shimmer 8s linear infinite;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .decoration-pattern {
        position: absolute;
        inset: 0;
        background:
          radial-gradient(circle at 20% 20%, rgba(255,255,255,0.06), transparent 14%),
          radial-gradient(circle at 80% 25%, rgba(255,215,0,0.08), transparent 14%),
          radial-gradient(circle at 30% 75%, rgba(255,255,255,0.05), transparent 16%),
          radial-gradient(circle at 75% 80%, rgba(255,193,7,0.07), transparent 16%);
        pointer-events: none;
      }

      .input-icon {
        color: #FFD700;
        transition: all 0.3s ease;
      }

      .input-wrapper {
        position: relative;
        margin-bottom: 20px;
      }

      .input-label {
        position: absolute;
        top: -10px;
        left: 20px;
        background: white;
        padding: 0 8px;
        font-size: 12px;
        color: #8B4513;
        font-weight: 600;
        border-radius: 10px;
        z-index: 3;
      }

      .card-content {
        position: relative;
        z-index: 2;
      }

      .card-lottery-deco {
        position: absolute;
        pointer-events: none;
        z-index: 1;
        opacity: 0.5;
        filter: drop-shadow(0 8px 14px rgba(0, 0, 0, 0.18));
      }

      .card-lucky-ball {
        position: absolute;
        width: 26px;
        height: 26px;
        border-radius: 50%;
        background: linear-gradient(135deg, #FFD700, #FFA500);
        color: #fff;
        font-size: 10px;
        font-weight: 800;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 6px 12px rgba(255, 165, 0, 0.18);
        opacity: 0.5;
        z-index: 0;
        animation: softBlink 2.8s ease-in-out infinite;
      }

      .language-wrap .ant-segmented {
        background: rgba(255,255,255,0.9) !important;
        border: 2px solid #ffd76a !important;
        border-radius: 999px !important;
        padding: 4px !important;
        box-shadow: 0 8px 20px rgba(255, 193, 7, 0.14);
      }

      .language-wrap .ant-segmented-item {
        border-radius: 999px !important;
        font-weight: 700;
        color: #8b4513 !important;
        min-width: 95px;
      }

      .language-wrap .ant-segmented-item-selected {
        background: linear-gradient(135deg, #fff1b8, #ffd666) !important;
        color: #7a3d00 !important;
      }

      @media (max-width: 768px) {
        .card-lottery-deco {
          width: 40px !important;
        }

        .card-lucky-ball {
          width: 22px;
          height: 22px;
          font-size: 9px;
        }
      }
    `;

    document.head.appendChild(style);

    return () => {
      const existing = document.getElementById(styleId);
      if (existing) existing.remove();
    };
  }, []);
  const handleStart = async () => {
    if (!name.trim() || !mobile.trim()) {
      message.warning({
        content: t.enterBoth,
        icon: <SafetyOutlined />,
        style: { marginTop: "20vh" },
      });
      return;
    }

    if (!/^07\d{8}$/.test(mobile)) {
      message.error({
        content: t.invalidPhone,
        icon: <PhoneOutlined />,
        style: { marginTop: "20vh" },
      });
      return;
    }

    try {
      setLoading(true);

      const res = await checkOrLoginPlayer({
        fullName: name.trim(),
        phone: mobile.trim(),
      });

      if (!res?.success) {
        message.error({
          content: res?.message || "Login failed",
          style: { marginTop: "20vh" },
        });
        return;
      }

      if (res.playedBefore) {
        message.warning({
          content: "This user has already played before",
          style: { marginTop: "20vh" },
        });
        return;
      }

      const playerData = {
        _id: res.player?._id,
        name: res.player?.fullName || name.trim(),
        phone: res.player?.phone || mobile.trim(),
      };

      localStorage.setItem("player", JSON.stringify(playerData));
      localStorage.setItem("appLanguage", JSON.stringify(language));

      setPlayer(playerData);

      message.success({
        content: t.welcomeMsg,
        duration: 1.5,
        style: { marginTop: "20vh" },
      });

      setTimeout(() => {
        navigate("/");
      }, 800);
    } catch (error) {
      console.error("handleStart error:", error);
      message.error({
        content: t.err,
        style: { marginTop: "20vh" },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="welcome-container" ref={containerRef}>
      <div className="decoration-pattern" />

      <div
        style={{
          position: "absolute",
          width: 430,
          height: 430,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,215,0,0.18), rgba(255,215,0,0.04), transparent)",
          filter: "blur(18px)",
          zIndex: 0,
          transform: `translate(${mousePosition.x * 0.35}px, ${mousePosition.y * 0.35}px)`,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          width: "100%",
          maxWidth: 500,
          position: "relative",
          zIndex: 2,
          margin: "0 auto",
        }}
      >
        <Card className="welcome-card">
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 8,
              background:
                "linear-gradient(90deg, #FFD700, #FFA500, #FF5E7E, #FFD700)",
            }}
          />

          <img
            src={Ada}
            alt="Ada"
            className="card-lottery-deco"
            style={{
              top: 50,
              left: 50,
              width: 52,
              transform: "rotate(-12deg)",
            }}
          />
          <img
            src={Jaya}
            alt="Jaya"
            className="card-lottery-deco"
            style={{
              top: 350,
              right: 10,
              width: 50,
              transform: "rotate(8deg)",
            }}
          />
          <img
            src={Dana}
            alt="Dana"
            className="card-lottery-deco"
            style={{
              top: 118,
              right: 10,
              width: 50,
              transform: "rotate(10deg)",
            }}
          />
          <img
            src={Mega}
            alt="Mega"
            className="card-lottery-deco"
            style={{
              top: 150,
              left: 10,
              width: 52,
              transform: "rotate(-12deg)",
            }}
          />
          <img
            src={Handa}
            alt="Handa"
            className="card-lottery-deco"
            style={{
              top: 418,
              right: 250,
              width: 70,
              transform: "rotate(10deg)",
            }}
          />
          <img
            src={Govi}
            alt="Govi"
            className="card-lottery-deco"
            style={{
              bottom: 118,
              left: 10,
              width: 50,
              transform: "rotate(-8deg)",
            }}
          />
          <img
            src={Maha}
            alt="Maha"
            className="card-lottery-deco"
            style={{
              bottom: 88,
              right: 10,
              width: 50,
              transform: "rotate(8deg)",
            }}
          />

          <div
            className="card-content"
            style={{ padding: "22px 24px", position: "relative" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
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
                  marginBottom: 22,
                  maxWidth: "80%",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 0,
              }}
            >
              <motion.img
                src={AwuruduGames}
                alt="Awurudu Games"
                initial={{ opacity: 0, scale: 0.85, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.65 }}
                style={{
                  width: 180,
                  maxWidth: "80%",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.45 }}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
                gap: 12,
                marginBottom: 18,
                flexWrap: "wrap",
              }}
            >
              <div className="language-wrap" style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#8B4513",
                    marginBottom: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                  }}
                ></div>

                <Segmented
                  value={language}
                  onChange={changeLanguage}
                  options={[
                    { label: "සිංහල", value: "si" },
                    { label: "தமிழ்", value: "ta" },
                  ]}
                />
              </div>

              <div style={{ textAlign: "center" }}>
                <Button
                  onClick={toggleMute}
                  style={{
                    height: 40,
                    borderRadius: 999,
                    border: "2px solid #ffd76a",
                    background: "rgba(255,255,255,0.92)",
                    color: "#8B4513",
                    fontWeight: 700,
                    padding: "0 18px",
                    boxShadow: "0 8px 20px rgba(255, 193, 7, 0.14)",
                  }}
                  icon={isMuted ? <AudioMutedOutlined /> : <SoundOutlined />}
                >
                  {isMuted ? t.unmute : t.mute}
                </Button>
              </div>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.5 }}
              style={{
                textAlign: "center",
                color: "#5f5f5f",
                fontSize: 15,
                marginBottom: 18,
              }}
            >
              {t.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.36, duration: 0.5 }}
              className="input-wrapper"
            >
              <span className="input-label">
                <UserOutlined className="input-icon" /> {t.nameLabel}
              </span>
              <Input
                placeholder={t.namePlaceholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setNameFocused(true)}
                onBlur={() => setNameFocused(false)}
                className="welcome-input"
                prefix={
                  <UserOutlined
                    style={{ color: nameFocused ? "#FFD700" : "#999" }}
                  />
                }
              />
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: nameFocused ? 1 : 0 }}
                style={{
                  height: 2,
                  background: "linear-gradient(90deg, #FFD700, #FFA500)",
                  marginTop: 4,
                  borderRadius: 2,
                  transformOrigin: "left",
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.5 }}
              className="input-wrapper"
            >
              <span className="input-label">
                <PhoneOutlined className="input-icon" /> {t.mobileLabel}
              </span>
              <Input
                placeholder={t.mobilePlaceholder}
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                onFocus={() => setMobileFocused(true)}
                onBlur={() => setMobileFocused(false)}
                className="welcome-input"
                maxLength={10}
                prefix={
                  <PhoneOutlined
                    style={{ color: mobileFocused ? "#FFD700" : "#999" }}
                  />
                }
              />
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: mobileFocused ? 1 : 0 }}
                style={{
                  height: 2,
                  background: "linear-gradient(90deg, #FFD700, #FFA500)",
                  marginTop: 4,
                  borderRadius: 2,
                  transformOrigin: "left",
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.54, duration: 0.5 }}
            >
              <Button
                type="primary"
                block
                className="start-btn"
                onClick={handleStart}
                loading={loading}
              >
                {loading ? t.starting : t.start}
              </Button>
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
