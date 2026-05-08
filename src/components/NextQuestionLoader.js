import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function NextQuestionLoader({
  visible = false,
  duration = 3,
  text, // optional override
}) {
  const { language } = useLanguage();

  const loaderContent = {
    si: {
      loading: "ඊළඟ ප්‍රශ්නය සකස් වෙමින් පවතී...",
      sub: "කරුණාකර රැඳී සිටින්න...",
      go: "යමු!",
    },
    ta: {
      loading: "அடுத்த கேள்வி தயாராகிறது...",
      sub: "தயவு செய்து காத்திருக்கவும்...",
      go: "போவோம்!",
    },
  };

  const t = loaderContent[language] || loaderContent.si;

  const [count, setCount] = useState(duration);

  useEffect(() => {
    if (!visible) return;

    setCount(duration);

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [visible, duration]);

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
            background: "rgba(0,0,0,0.5)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: "linear-gradient(135deg, #FFF8E7, #FFEBCD)",
              border: "2px solid #FFD700",
              borderRadius: 24,
              padding: "30px 40px",
              textAlign: "center",
              boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
              minWidth: 260,
            }}
          >
            {/* 🔥 COUNTDOWN */}
            <motion.div
              key={count}
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1.1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={{
                width: 90,
                height: 90,
                borderRadius: "50%",
                margin: "0 auto 20px",
                background: "linear-gradient(135deg, #E44D2E, #F9A826)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 34,
                fontWeight: 800,
                color: "#fff",
                boxShadow: "0 10px 30px rgba(228,77,46,0.4)",
              }}
            >
              {count > 0 ? count : t.go}
            </motion.div>

            {/* MAIN TEXT */}
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#8B4513",
                marginBottom: 8,
              }}
            >
              {t.loading}
            </div>

            {/* SUB TEXT */}
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              style={{
                fontSize: 14,
                color: "#999",
              }}
            >
              {t.sub}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}