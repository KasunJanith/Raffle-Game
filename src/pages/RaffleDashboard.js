import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Spin } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { saveWinner } from "../api/raffleApi";
import "./RaffleDashboard.css";

const BUBBLE_SIZE = 110; // width/height of each circle
const SHUFFLE_DURATION = 3; // seconds before winner is chosen

export default function RaffleDashboard() {
  const navigate = useNavigate();
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drawing, setDrawing] = useState(false);

  // Fetch participants
  const loadParticipants = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:5000/api/raffle/participants");
      const data = await res.json();
      if (data.success) {
        setParticipants(data.participants);
      }
    } catch (err) {
      console.error("Error fetching participants:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadParticipants();
    const interval = setInterval(loadParticipants, 3000);
    return () => clearInterval(interval);
  }, [loadParticipants]);

  const handleStartDraw = () => {
    if (participants.length === 0) {
      alert("No participants to draw from!");
      return;
    }
    setDrawing(true);

    // Wait for shuffling animation, then pick a random winner
    setTimeout(async () => {
      const randomIndex = Math.floor(Math.random() * participants.length);
      const winner = participants[randomIndex];

      try {
        await saveWinner(winner);
        // Remove winner from displayed list
        setParticipants(prev => prev.filter(p => p.id !== winner.id));
        // Navigate after short celebration
        setTimeout(() => {
          navigate("/winner", { state: { winner } });
        }, 800);
      } catch (err) {
        console.error("Error saving winner:", err);
        setDrawing(false);
      }
    }, SHUFFLE_DURATION * 1000);
  };

  return (
    <div className="raffle-dashboard-container">
      <div className="dashboard-bg" />

      <motion.div
        className="dashboard-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="stat-card">
          <UserOutlined style={{ fontSize: 32, color: "#AE8625" }} />
          <span className="stat-value">{participants.length}</span>
          <span className="stat-label">Participants</span>
        </div>
        <div className="stat-card">
          <span className="stat-value" style={{ color: drawing ? "#FFD700" : "#AE8625" }}>
            {drawing ? "SPINNING..." : "READY"}
          </span>
          <span className="stat-label">Status</span>
        </div>
      </motion.div>
{/* Draw button */}
      <motion.div
        className="draw-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Button
          className="draw-button"
          size="large"
          onClick={handleStartDraw}
          disabled={drawing || participants.length === 0}
        >
          {drawing ? "🎲 SPINNING..." : "🎲 START DRAW"}
        </Button>
      </motion.div>
      <motion.h2 className="section-title" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        🎈 LIVE PARTICIPANTS 🎈
      </motion.h2>

      {/* Bubble grid */}
      <div className="bubble-grid">
        {loading ? (
          <div className="loading-center">
            <Spin size="large" />
          </div>
        ) : participants.length === 0 ? (
          <motion.div className="no-participants" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p>Waiting for participants...</p>
          </motion.div>
        ) : (
          <AnimatePresence>
            {participants.map((p, index) => (
              <motion.div
                key={p.id}
                className="participant-bubble"
                layout
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.08 }}
              >
                <div className="bubble-phone">{p.phone}</div>
                <div className="bubble-name">{p.name}</div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      

      {/* Shuffling overlay */}
      {drawing && (
        <motion.div
          className="shuffle-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {participants.slice(0, 20).map((p, i) => (
            <motion.div
              key={p.id}
              className="flying-bubble"
              initial={{
                x: Math.random() * 300 - 150,
                y: Math.random() * 300 - 150,
                scale: 0.8,
                opacity: 0,
              }}
              animate={{
                x: [null, Math.random() * 400 - 200, Math.random() * 400 - 200],
                y: [null, Math.random() * 400 - 200, Math.random() * 400 - 200],
                scale: [0.8, 1.2, 0.9],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: SHUFFLE_DURATION,
                ease: "easeInOut",
                delay: i * 0.05,
              }}
            >
              <span>{p.phone.slice(-4)}</span>
            </motion.div>
          ))}
          <div className="spinner-center">🎡</div>
        </motion.div>
      )}
    </div>
  );
}