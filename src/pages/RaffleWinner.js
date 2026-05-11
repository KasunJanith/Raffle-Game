import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import "./RaffleWinner.css";

export default function RaffleWinner() {
  const location = useLocation();
  const navigate = useNavigate();
  const winner = location.state?.winner || {
    name: "Congratulations!",
    phone: "Winner",
  };

  const handleBackHome = () => {
    navigate("/");
  };

  return (
    <div className="raffle-winner-container">
      {/* Animated confetti background */}
      <div className="confetti-container">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="confetti"
            animate={{
              y: [0, window.innerHeight + 100],
              x: [0, Math.random() * 200 - 100],
              rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
              opacity: [1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.05,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: "-10px",
            }}
          >
            {["🎉", "🎊", "🎈", "✨", "⭐", "🏆"][i % 6]}
          </motion.div>
        ))}
      </div>

      {/* Spotlight effect */}
      <motion.div
        className="spotlight"
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      ></motion.div>

      {/* Main content */}
      <motion.div
        className="winner-content"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15,
          duration: 1,
        }}
      >
        {/* "WINNER" text with glow */}
        <motion.h1
          className="winner-label"
          animate={{
            scale: [1, 1.05, 1],
            textShadow: [
              "0 0 20px rgba(255, 215, 0, 0.5), 0 0 40px rgba(255, 215, 0, 0.3)",
              "0 0 40px rgba(255, 215, 0, 0.8), 0 0 80px rgba(255, 215, 0, 0.6)",
              "0 0 20px rgba(255, 215, 0, 0.5), 0 0 40px rgba(255, 215, 0, 0.3)",
            ],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          🏆 WINNER 🏆
        </motion.h1>

        {/* Winner name card */}
        <motion.div
          className="winner-card"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
          }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="card-glow"></div>
          <h2 className="winner-phone">{winner.phone}</h2>
          <p className="winner-name">{winner.name}</p>
          
        </motion.div>

        {/* Congratulations message */}
        <motion.p
          className="congratulations-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.6,
            duration: 0.8,
          }}
        >
          🎉 Congratulations! 🎉
        </motion.p>

        {/* Decorative crown */}
        <motion.div
          className="crown"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          👑
        </motion.div>

        {/* Particle effects around winner */}
        <div className="particles-around">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="particle"
              animate={{
                x: [0, Math.cos((i / 12) * Math.PI * 2) * 100],
                y: [0, Math.sin((i / 12) * Math.PI * 2) * 100],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              style={{
                "--index": i,
              }}
            >
              ✨
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Back home button */}
      <motion.div
        className="back-button-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 1,
          duration: 0.6,
        }}
      >
        <Button
          type="primary"
          size="large"
          className="back-home-btn"
          onClick={handleBackHome}
          icon={<HomeOutlined />}
        >
          Back to Home
        </Button>
      </motion.div>

      {/* Animated background gradient */}
      <motion.div
        className="gradient-background"
        animate={{
          background: [
            "linear-gradient(45deg, #ff6b6b, #f5576c)",
            "linear-gradient(45deg, #f5576c, #ffd700)",
            "linear-gradient(45deg, #ffd700, #ff6b6b)",
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      ></motion.div>
    </div>
  );
}
