import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Spin, Modal, Input, List, Avatar, Badge } from "antd";
import {
  UserOutlined,
  SearchOutlined,
  TrophyOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { saveWinner } from "../api/raffleApi";
import "./RaffleDashboard.css";

const INITIAL_DISPLAY = 20;
const SHUFFLE_DURATION = 4;

export default function RaffleDashboard() {
  const navigate = useNavigate();
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drawing, setDrawing] = useState(false);

  // Winners state – we keep all winners for the modal + total count
  const [allWinners, setAllWinners] = useState([]); // full list
  const recentWinners = allWinners.slice(-5);      // last 5 for the panel

  // Modal controls
  const [participantsModalVisible, setParticipantsModalVisible] = useState(false);
  const [winnersModalVisible, setWinnersModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

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

  // Fetch all winners (for total count and modal)
  const loadWinners = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:5000/api/raffle/winners");
      const data = await res.json();
      if (data.success) {
        setAllWinners(data.winners);
      }
    } catch (err) {
      console.error("Error fetching winners:", err);
    }
  }, []);

  useEffect(() => {
    loadParticipants();
    loadWinners();
    const interval = setInterval(() => {
      loadParticipants();
      loadWinners();
    }, 3000);
    return () => clearInterval(interval);
  }, [loadParticipants, loadWinners]);

  // Start draw – after shuffle, pick winner, save, then navigate to winner page
  const handleStartDraw = () => {
    if (participants.length === 0) {
      alert("No participants to draw from!");
      return;
    }
    setDrawing(true);

    setTimeout(async () => {
      const randomIndex = Math.floor(Math.random() * participants.length);
      const winner = participants[randomIndex];

      try {
        await saveWinner(winner);
        // Remove winner locally
        setParticipants((prev) => prev.filter((p) => p.id !== winner.id));
        loadWinners(); // refresh winners list
        navigate("/winner", { state: { winner } });
      } catch (err) {
        console.error("Error saving winner:", err);
      } finally {
        setDrawing(false);
      }
    }, SHUFFLE_DURATION * 1000);
  };

  // Filter for participants modal
  const filteredParticipants = searchText
    ? participants.filter(
        (p) =>
          p.phone.includes(searchText) ||
          p.name.toLowerCase().includes(searchText.toLowerCase())
      )
    : participants;

  const showMoreButton = participants.length > INITIAL_DISPLAY;

  return (
    <div className="raffle-dashboard-container">
      <div className="dashboard-bg" />

      {/* Header stats */}
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
          <span
            className="stat-value"
            style={{ color: drawing ? "#FFD700" : "#AE8625" }}
          >
            {drawing ? "SPINNING..." : "READY"}
          </span>
          <span className="stat-label">Status</span>
        </div>
        <div className="stat-card">
          <TrophyOutlined style={{ fontSize: 32, color: "#FFD700" }} />
          <span className="stat-value">{allWinners.length}</span>
          <span className="stat-label">Total Winners</span>
        </div>
      </motion.div>

      <motion.h2 className="section-title" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        🎈 LIVE PARTICIPANTS 🎈
      </motion.h2>

      {/* Bubble grid (limited) */}
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
            {participants.slice(0, INITIAL_DISPLAY).map((p, index) => (
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

      {/* View More participants */}
      {showMoreButton && (
        <div className="view-more-section">
          <Button
            type="default"
            className="view-more-btn"
            onClick={() => setParticipantsModalVisible(true)}
          >
            View All Participants ({participants.length})
          </Button>
        </div>
      )}

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

      {/* Shuffling overlay */}
      {drawing && (
        <motion.div
          className="shuffle-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {participants.slice(0, 30).map((p, i) => (
            <motion.div
              key={p.id}
              className="flying-bubble"
              initial={{
                x: Math.random() * 300 - 150,
                y: Math.random() * 300 - 150,
                scale: 1.0,
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
          
        </motion.div>
      )}

      {/* Recent winners panel (bottom-right) */}
      {recentWinners.length > 0 && (
        <div className="winners-panel">
          <h3>🏆 Recent Winners</h3>
          <div className="winners-list">
            {recentWinners.map((w, i) => (
              <div key={i} className="winner-item">
                <span className="w-phone">{w.phone}</span>
                <span className="w-name">{w.name}</span>
              </div>
            ))}
          </div>
          <Button
            type="link"
            className="see-all-winners-btn"
            onClick={() => setWinnersModalVisible(true)}
          >
            See All Winners ({allWinners.length})
          </Button>
        </div>
      )}

      {/* All Participants Modal */}
      <Modal
        title="All Participants"
        open={participantsModalVisible}
        onCancel={() => {
          setParticipantsModalVisible(false);
          setSearchText("");
        }}
        footer={null}
        width={700}
        classNames={{
          content: "dark-modal-content",
          header: "dark-modal-header",
          body: "dark-modal-body",
        }}
        styles={{
          content: {
            background: "#1a1a1a",
            border: "2px solid #AE8625",
            borderRadius: 20,
            boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
          },
          header: {
            background: "transparent",
            borderBottom: "1px solid #AE8625",
          },
          body: {
            background: "transparent",
            padding: "20px 24px",
          },
        }}
      >
        <Input
          prefix={<SearchOutlined />}
          placeholder="Search by phone or name..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="modal-search"
          allowClear
        />
        <List
          dataSource={filteredParticipants}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon={<UserOutlined />} />}
                title={<span className="modal-phone">{item.phone}</span>}
                description={item.name}
              />
            </List.Item>
          )}
          className="modal-list"
        />
      </Modal>

      {/* All Winners Modal */}
      <Modal
        title="All Winners"
        open={winnersModalVisible}
        onCancel={() => setWinnersModalVisible(false)}
        footer={null}
        width={700}
        classNames={{
          content: "dark-modal-content",
          header: "dark-modal-header",
          body: "dark-modal-body",
        }}
        styles={{
          content: {
            background: "#1a1a1a",
            border: "2px solid #AE8625",
            borderRadius: 20,
            boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
          },
          header: {
            background: "transparent",
            borderBottom: "1px solid #AE8625",
          },
          body: {
            background: "transparent",
            padding: "20px 24px",
          },
        }}
      >
        <List
          dataSource={allWinners}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon={<TrophyOutlined />} style={{ background: "#FFD700" }} />}
                title={<span className="modal-phone">{item.phone}</span>}
                description={`${item.name} – ${item.timestamp}`}
              />
            </List.Item>
          )}
          className="modal-list"
        />
      </Modal>
    </div>
  );
}