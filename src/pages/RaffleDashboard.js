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
  const [showAll, setShowAll] = useState(false);
  const INITIAL_DISPLAY_COUNT = 20;

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
      >        <Row gutter={[24, 24]} justify="center">
          <Col xs={24} sm={12} md={6}>
            <Card className="stat-card">
              <Statistic
                title="Total Participants"
                value={participants.length}
                prefix={<UserOutlined />}
                valueStyle={{ color: "#AE8625", fontSize: "28px", fontWeight: "bold" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="stat-card">
              <Statistic
                title="Draw Status"
                value={drawStarted ? "IN PROGRESS" : "READY"}
                valueStyle={{ color: drawStarted ? "#FFD700" : "#AE8625", fontSize: "18px", fontWeight: "bold" }}
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
        </motion.h2>        <div className="participants-grid">
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
              <>
                {(showAll ? participants : participants.slice(0, INITIAL_DISPLAY_COUNT)).map((participant, index) => (
                  <motion.div
                    key={participant.id}
                    className="participant-card"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ delay: index * 0.03 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div className="card-header">
                      <span className="participant-index">#{index + 1}</span>
                    </div>
                    <div className="card-body">
                      <div className="participant-name">{participant.name}</div>
                      <div className="participant-phone">
                        <span className="phone-label">📞</span>
                        <span className="phone-number">{participant.phone}</span>
                      </div>
                    </div>
                    {drawStarted && (
                      <motion.div
                        className="card-pulse"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      ></motion.div>
                    )}
                  </motion.div>
                ))}
              </>
            )}
          </AnimatePresence>
        </div>

        {!showAll && participants.length > INITIAL_DISPLAY_COUNT && (
          <motion.div
            className="view-more-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              type="default"
              size="large"
              className="view-more-btn"
              onClick={() => setShowAll(true)}
            >
              View More ({participants.length - INITIAL_DISPLAY_COUNT} more)
            </Button>
          </motion.div>
        )}

        {showAll && participants.length > INITIAL_DISPLAY_COUNT && (
          <motion.div
            className="view-less-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              type="default"
              size="large"
              className="view-less-btn"
              onClick={() => setShowAll(false)}
            >
              Show Less
            </Button>
          </motion.div>
        )}
      </div>      {/* Draw button */}
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
        >
          {drawStarted ? "🎲 SPINNING..." : "🎲 START DRAW"}
        </Button>
      </motion.div>

      {/* Spinning animation during draw */}
      {drawStarted && (
        <div className="spinning-container">
          <motion.div
            className="spinning-wheel"
            animate={{ rotate: 360 }}
            transition={{
              duration: 5,
              ease: "linear",
              repeat: 0,
            }}
          >
            {participants.slice(0, Math.min(12, participants.length)).map((participant, i) => (
              <div
                key={i}
                className="wheel-item"
                style={{
                  transform: `rotate(${(i / Math.min(12, participants.length)) * 360}deg) translateY(-120px)`,
                }}
              >
                <div className="wheel-bubble">
                  <span className="bubble-phone">{participant.phone.substring(participant.phone.length - 4)}</span>
                </div>
              </div>
            ))}
          </motion.div>
          
          <motion.div
            className="spinning-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            🎉
          </motion.div>
        </div>
      )}
    </div>
  );
}
