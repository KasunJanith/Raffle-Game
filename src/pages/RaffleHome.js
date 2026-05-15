import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import "./RaffleHome.css";

export default function RaffleHome() {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate("/dashboard");
  };

  return (
    <div className="raffle-home-container">
      {/* Animated Background */}
      <div className="raffle-bg-gradient"></div>
      
      {/* Floating decorative elements */}
      <div className="floating-confetti">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="confetti-piece"
            animate={{
              y: [0, -500],
              x: [0, Math.random() * 200 - 100],
              rotate: [0, 360],
              opacity: [1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.1,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: "100%",
              position: "absolute",
            }}
          >
            {["🎉", "🎊", "🎈", "✨", "⭐"][i % 5]}
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        className="raffle-home-content"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Title */}
        <motion.h1
          className="raffle-title"
          animate={{
            textShadow: [
              "0 0 20px rgba(255, 215, 0, 0.5)",
              "0 0 40px rgba(255, 215, 0, 0.8)",
              "0 0 20px rgba(255, 215, 0, 0.5)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🎰 RAFFLE DRAW
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="raffle-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Press Start to Begin the Draw
        </motion.p>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            type="primary"
            size="large"
            className="start-game-btn"
            onClick={handleStartGame}
            icon={<PlayCircleOutlined />}
          >
            START GAME
          </Button>
        </motion.div>

        {/* Decorative cards */}
      
      </motion.div>

      {/* Background light effect */}
      <motion.div
        className="light-effect"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      ></motion.div>
    </div>
  );
}
