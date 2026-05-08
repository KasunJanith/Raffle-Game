import { Modal, Button, message, Spin } from "antd";
import { Wheel } from "react-custom-roulette";
import { useEffect, useState, useCallback } from "react";
import { getSpinConfig, playSpin } from "../api/gameApi";
import { motion, AnimatePresence } from "framer-motion";

export default function BonusSpinModal({ open, onClose, player }) {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeIndex, setPrizeIndex] = useState(0);
  const [result, setResult] = useState(null);
  const [loadingSpin, setLoadingSpin] = useState(false);
  const [loadingConfig, setLoadingConfig] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [data, setData] = useState([]);

  /* ================= LOAD CONFIG ================= */
  const loadSpinConfig = useCallback(async () => {
    try {
      setLoadingConfig(true);
      const res = await getSpinConfig();

      if (res?.success && Array.isArray(res.data)) {
        setData(res.data);
      } else {
        message.error("Invalid spin config");
      }
    } catch (err) {
      message.error("Failed to load spin config");
    } finally {
      setLoadingConfig(false);
    }
  }, []);

  useEffect(() => {
    if (open) loadSpinConfig();
  }, [open, loadSpinConfig]);

  /* ================= SAFE INDEX FINDER ================= */
  const findPrizeIndex = (prize) => {
    if (!data.length) return 0;

    // normalize
    const normalizedPrize = String(prize).toLowerCase().trim();

    return (
      data.findIndex((item) => {
        const option = item.option?.toLowerCase().trim();

        // exact match first
        if (option === normalizedPrize) return true;

        // numeric match (Rs values)
        if (!isNaN(prize)) {
          return option.includes(String(prize));
        }

        // try again / no chance
        if (normalizedPrize.includes("no") || normalizedPrize.includes("try")) {
          return option.includes("try") || option.includes("chance");
        }

        return false;
      }) || 0
    );
  };

  /* ================= HANDLE SPIN ================= */
  const handleSpin = async () => {
    if (mustSpin || loadingSpin) return;

    try {
      setLoadingSpin(true);
      setShowResult(false);

      const res = await playSpin({ playerId: player });

      if (!res?.success) {
        message.error(res?.message || "Spin failed");
        return;
      }

      const index = findPrizeIndex(res.prize);
      localStorage.setItem("spinPrize", JSON.stringify(res.prize));

      setResult(res.prize);
      setPrizeIndex(index);
      setMustSpin(true);
    } catch (err) {
      message.error("Something went wrong");
    } finally {
      setLoadingSpin(false);
    }
  };

  /* ================= HANDLE STOP ================= */
  const handleStop = () => {
    setMustSpin(false);
    setShowResult(true);

    if (result === "No Chance") {
      message.warning("No Chance");
    } else {
      message.success(`🎉 You won Rs.${result}!`);
    }

    // auto close
    setTimeout(() => {
      setShowResult(false);
      onClose();
    }, 5000);
  };

  /* ================= UI ================= */
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      styles={{
        mask: { background: "rgba(0,0,0,0.6)" },
        content: { background: "transparent", boxShadow: "none" },
      }}
    >
      <div style={{ textAlign: "center", position: "relative" }}>
        {/* 🔥 Glow */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
          style={{
            position: "absolute",
            width: 320,
            height: 320,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,215,0,0.4), transparent)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 0,
          }}
        />

        {/* TITLE */}
        <h2
          style={{
            color: "#FFD700",
            fontWeight: "bold",
            textShadow: "0 0 15px #FFD700",
            marginBottom: 10,
          }}
        >
          🎡 Spin & Win
        </h2>

        {/* POINTER */}
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: "12px solid transparent",
            borderRight: "12px solid transparent",
            borderTop: "20px solid #FFD700",
            margin: "0 auto",
            marginBottom: -10,
            zIndex: 2,
            position: "relative",
          }}
        />

        {/* WHEEL */}
        <div
          style={{
            margin: "20px 0",
            padding: 20,
            borderRadius: 20,
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 0 40px rgba(255,215,0,0.4)",
          }}
        >
          {loadingConfig ? (
            <Spin />
          ) : (
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeIndex}
              data={data}
              onStopSpinning={handleStop}
              outerBorderColor="#FFD700"
              outerBorderWidth={6}
              radiusLineColor="#fff"
              radiusLineWidth={2}
            />
          )}
        </div>

        {/* BUTTON */}
        <Button
          type="primary"
          size="large"
          onClick={handleSpin}
          loading={loadingSpin}
          disabled={mustSpin || loadingConfig}
          style={{
            background: "linear-gradient(135deg, #FFD700, #FF8C00)",
            border: "none",
            fontWeight: "bold",
            fontSize: 16,
            padding: "10px 32px",
            borderRadius: 12,
            color: "#000",
          }}
        >
          🎯 {loadingSpin ? "Spinning..." : "Spin Now"}
        </Button>

        
      </div>
    </Modal>
  );
}
