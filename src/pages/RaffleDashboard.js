import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Spin, Statistic, Row, Col, Card } from "antd";
import { PlayCircleOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { saveWinner } from "../api/raffleApi";
import "./RaffleDashboard.css";

export default function RaffleDashboard() {
  const navigate = useNavigate();
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drawStarted, setDrawStarted] = useState(false);

  // Fetch participants from backend
  const loadParticipants = async () => {
    try {
      const data = await fetch("http://localhost:5000/api/raffle/participants").then(r => r.json());
      if (data.success) {
        setParticipants(data.participants);
      }
    } catch (error) {
      console.error("Error fetching participants:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadParticipants();
    // Poll for new participants every 3 seconds
    const interval = setInterval(loadParticipants, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleStartDraw = async () => {
    if (participants.length === 0) {
      alert("No participants to draw from!");
      return;
    }

    setDrawStarted(true);
    
    // Select random winner
    const randomIndex = Math.floor(Math.random() * participants.length);
    const winner = participants[randomIndex];

    // Simulate draw animation duration
    setTimeout(async () => {
      // Save winner to backend
      try {
        await saveWinner(winner);
        navigate("/winner", { state: { winner } });
      } catch (error) {
        console.error("Error saving winner:", error);
      }
    }, 5000); // 5 second animation duration
  };

  return (
    <div className="raffle-dashboard-container">
      {/* Animated background */}
      <div className="dashboard-bg"></div>

      {/* Header stats */}
      <motion.div
        className="dashboard-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Row gutter={[24, 24]} justify="center">
          <Col xs={24} sm={12} md={6}>
            <Card className="stat-card">
              <Statistic
                title="Total Participants"
                value={participants.length}
                prefix={<UserOutlined />}
                valueStyle={{ color: "#ff6b6b", fontSize: "28px" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="stat-card">
              <Statistic
                title="Draw Status"
                value={drawStarted ? "IN PROGRESS" : "READY"}
                valueStyle={{ color: drawStarted ? "#ff9c3b" : "#51cf66", fontSize: "18px" }}
              />
            </Card>
          </Col>
        </Row>
      </motion.div>

      {/* Participants display with floating balloons */}
      <div className="participants-section">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          🎈 LIVE PARTICIPANTS 🎈
        </motion.h2>

        <div className="participants-grid">
          <AnimatePresence>
            {loading ? (
              <div className="loading-center">
                <Spin size="large" />
              </div>
            ) : participants.length === 0 ? (
              <motion.div
                className="no-participants"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p>Waiting for participants...</p>
              </motion.div>
            ) : (
              participants.map((participant, index) => (
                <motion.div
                  key={participant.id}
                  className="participant-balloon"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="balloon-inner">
                    <div className="balloon-color"></div>
                    <div className="balloon-shine"></div>
                    <div className="balloon-content">
                      <span className="participant-name">{participant.name}</span>
                      {drawStarted && (
                        <motion.div
                          className="balloon-pulse"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                        ></motion.div>
                      )}
                    </div>
                  </div>
                  <div className="balloon-string"></div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Draw button */}
      <motion.div
        className="draw-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Button
          type="primary"
          size="large"
          className="draw-button"
          onClick={handleStartDraw}
          disabled={drawStarted || participants.length === 0}
          icon={<PlayCircleOutlined />}
        >
          {drawStarted ? "🎲 DRAWING..." : "🎲 START DRAW"}
        </Button>
      </motion.div>

      {/* Floating elements during draw */}
      {drawStarted && (
        <div className="draw-animation">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="draw-element"
              animate={{
                y: [0, -500],
                x: [0, Math.random() * 400 - 200],
                rotate: [0, 360],
              }}
              transition={{
                duration: 2 + Math.random(),
                ease: "easeOut",
              }}
              style={{
                left: "50%",
                top: "50%",
              }}
            >
              {["✨", "🎉", "🎊", "⭐"][i % 4]}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
