import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function GameCountdown({
  start = false,
  seconds = 3,
  onComplete,
}) {
  const [count, setCount] = useState(seconds);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!start) return;

    setVisible(true);
    setCount(seconds);

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev === 1) {
          clearInterval(interval);

          setTimeout(() => {
            setVisible(false);
            onComplete?.(); // 🔥 trigger after countdown
          }, 500);

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [start, seconds, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.6)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <motion.div
            key={count}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              width: 140,
              height: 140,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #FFD700, #FFA500)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 48,
              fontWeight: "bold",
              color: "#000",
              boxShadow: "0 0 40px rgba(255,215,0,0.7)",
            }}
          >
            {count === 0 ? "GO!" : count}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}