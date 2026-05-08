import { Modal, Button } from "antd";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  GiftOutlined, 
  TrophyOutlined,
  StarOutlined,
  FireOutlined,
  CheckCircleOutlined
} from "@ant-design/icons";
import WINWAYLogo from "../assets/WIN WAY English Logo- PNG.png";

export default function GameEndModal({
  open,
  gameName = "Game",
  score = 0,
  time = null,
  onClose,
}) {
  const [showConfetti, setShowConfetti] = useState(false);

  // Trigger confetti when modal opens
  useEffect(() => {
    if (open) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Inject animations
  useEffect(() => {
    const styleId = "gameendmodal-festival-animations";
    if (document.getElementById(styleId)) return;

    const style = document.createElement("style");
    style.id = styleId;
    style.innerHTML = `
      @keyframes confettiFall {
        0% {
          transform: translateY(-100vh) rotate(0deg);
        }
        100% {
          transform: translateY(100vh) rotate(720deg);
        }
      }

      @keyframes bounceIn {
        0% {
          opacity: 0;
          transform: scale(0.3);
        }
        50% {
          opacity: 1;
          transform: scale(1.05);
        }
        70% {
          transform: scale(0.9);
        }
        100% {
          transform: scale(1);
        }
      }

      @keyframes float {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-10px);
        }
      }

      @keyframes spin {
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

      .modal-content {
        animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }

      .confetti-piece {
        position: fixed;
        width: 10px;
        height: 10px;
        background: linear-gradient(135deg, #FFD700, #FFA500);
        animation: confettiFall 3s linear infinite;
        pointer-events: none;
        z-index: 9999;
      }

      .floating-icon {
        animation: float 3s ease-in-out infinite;
      }

      .spinning-icon {
        animation: spin 10s linear infinite;
      }

      .glow-icon {
        animation: pulseGlow 2s ease-in-out infinite;
      }

      .reward-badge {
        transition: all 0.3s ease;
      }

      .reward-badge:hover {
        transform: scale(1.1);
        box-shadow: 0 10px 20px rgba(255, 215, 0, 0.3);
      }
    `;
    document.head.appendChild(style);
  }, []);

  // Generate random confetti pieces
  const confettiPieces = [];
  for (let i = 0; i < 50; i++) {
    confettiPieces.push({
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 2}s`,
      background: `hsl(${Math.random() * 60 + 30}, 80%, 60%)`,
    });
  }

  return (
    <Modal
      open={open}
      footer={null}
      centered
      closable={false}
      width={500}
      styles={{
        mask: {
          backdropFilter: "blur(8px)",
          background: "rgba(139, 69, 19, 0.6)",
        },
        content: {
          borderRadius: 32,
          padding: 0,
          overflow: "hidden",
          background: "linear-gradient(135deg, #FFF9E6, #FFE4B5)",
          border: "3px solid #FFD700",
          boxShadow: "0 30px 60px rgba(139, 69, 19, 0.3)",
        },
      }}
    >
      {/* Confetti Effect */}
      {showConfetti && confettiPieces.map((piece, i) => (
        <div
          key={i}
          className="confetti-piece"
          style={{
            left: piece.left,
            background: piece.background,
            animationDelay: piece.animationDelay,
          }}
        />
      ))}

      {/* Decorative Header Pattern */}
      <div
        style={{
          height: 8,
          background: "linear-gradient(90deg, #FFD700, #FFA500, #FFD700)",
          width: "100%",
        }}
      />

      <div className="modal-content" style={{ padding: 32, position: "relative" }}>
        {/* Decorative Background Elements */}
        <div
          style={{
            position: "absolute",
            top: -20,
            right: -20,
            width: 150,
            height: 150,
            background: "radial-gradient(circle, rgba(255,215,0,0.1) 0%, transparent 70%)",
            borderRadius: "50%",
            animation: "spin 20s linear infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -30,
            left: -30,
            width: 200,
            height: 200,
            background: "radial-gradient(circle, rgba(210,105,30,0.1) 0%, transparent 70%)",
            borderRadius: "50%",
            animation: "spin 15s linear infinite reverse",
          }}
        />

        {/* Floating Decorations */}
      
      
        <div
          className="floating-icon"
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            fontSize: 24,
            opacity: 0.3,
            animationDelay: "1s",
          }}
        >
          🏮
        </div>
        <div
          className="spinning-icon"
          style={{
            position: "absolute",
            bottom: 20,
            left: 20,
            fontSize: 24,
            opacity: 0.2,
          }}
        >
          ✨
        </div>
        <div
          className="spinning-icon"
          style={{
            position: "absolute",
            bottom: 20,
            right: 20,
            fontSize: 24,
            opacity: 0.2,
          }}
        >
          🌟
        </div>

        {/* Main Content */}
        <div style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
          {/* Trophy Icon with Glow */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="glow-icon"
            style={{
              fontSize: 80,
              marginBottom: 16,
              display: "inline-block",
            }}
          >
            🏆
          </motion.div>

          {/* Title with Gradient */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              color: "#8B4513",
              fontSize: 32,
              fontWeight: 800,
              margin: "0 0 8px",
              background: "linear-gradient(135deg, #8B4513, #D2691E)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
           
           
          </motion.h2>

          

          {/* Celebration Message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{
              fontSize: 16,
              color: "#5f5f5f",
              marginBottom: 24,
              lineHeight: 1.6,
            }}
          >
            ඔබ මෙම ක්‍රීඩාව සාර්ථකව අවසන් කළා! 
            <br />
            <span style={{ color: "#8B4513", fontWeight: 600 }}>
              සුභ අවුරුද්දක් වේවා!
            </span>
          </motion.p>

          {/* Score Display (if provided) */}
          {score > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{
                background: "linear-gradient(135deg, #FFF8E7, #FFE4B5)",
                border: "2px solid #FFD700",
                borderRadius: 50,
                padding: "12px 24px",
                marginBottom: 20,
                display: "inline-block",
              }}
            >
              <div style={{ color: "#8B4513", fontSize: 14, marginBottom: 4 }}>
                ඔබගේ ලකුණු
              </div>
              <div style={{ fontSize: 36, fontWeight: 800, color: "#E44D2E" }}>
                {score}
              </div>
            </motion.div>
          )}

          {/* Time Display (if provided) */}
          {time && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              style={{
                background: "rgba(255, 215, 0, 0.1)",
                borderRadius: 30,
                padding: "8px 16px",
                marginBottom: 24,
                display: "inline-block",
                color: "#8B4513",
              }}
            >
              ⏱️ ගත වූ කාලය: {time}s
            </motion.div>
          )}

          
          

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              type="primary"
              onClick={onClose}
              style={{
                height: 48,
                padding: "0 32px",
                borderRadius: 30,
                fontWeight: 700,
                fontSize: 16,
                background: "linear-gradient(135deg, #27AE60, #2ECC71)",
                border: "none",
                boxShadow: "0 10px 20px rgba(39,174,96,0.3)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
                e.currentTarget.style.boxShadow = "0 15px 30px rgba(39,174,96,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "0 10px 20px rgba(39,174,96,0.3)";
              }}
            >
              <GiftOutlined /> ප්‍රධාන පිටුවට
            </Button>

            <Button
              onClick={onClose}
              style={{
                height: 48,
                padding: "0 24px",
                borderRadius: 30,
                fontWeight: 600,
                border: "2px solid #FFD700",
                background: "transparent",
                color: "#8B4513",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.background = "rgba(255,215,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              වසන්න
            </Button>
          </motion.div>

          {/* Decorative Footer */}
          <div
            style={{
              marginTop: 24,
              display: "flex",
              justifyContent: "center",
              gap: 8,
              fontSize: 12,
              color: "#999",
            }}
          >
            <span>✨</span>
            <span>සුභ අවුරුද්දක්</span>
            <span>✨</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}

const styles = {
  rewardBadge: {
    background: "rgba(255, 255, 255, 0.8)",
    border: "1px solid #FFD700",
    borderRadius: 30,
    padding: "6px 14px",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontSize: 13,
    color: "#8B4513",
    cursor: "default",
    backdropFilter: "blur(5px)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },
  rewardIcon: {
    color: "#27AE60",
    fontSize: 14,
  },
};