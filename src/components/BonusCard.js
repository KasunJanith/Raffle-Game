import { Card, Button } from "antd";
import { GiftOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

export default function BonusCard({
  type = "AVAILABLE",
  isMobile,
  currentUi,
  onSpin,
}) {
  const isAvailable = type === "AVAILABLE";
  const [animateUnlock, setAnimateUnlock] = useState(false);

  useEffect(() => {
    if (isAvailable) {
      setAnimateUnlock(true);
      setTimeout(() => setAnimateUnlock(false), 1200);
    }
  }, [isAvailable]);

  return (
    <div
      className="games-card-animate"
      style={{
        textAlign: "center",
        marginTop: isMobile ? 30 : 40,
        padding: isMobile ? "0 10px" : 0,
      }}
    >
      <Card
        className="games-glow-icon"
        style={{
          maxWidth: isMobile ? "100%" : 500,
          margin: "0 auto",
          borderRadius: isMobile ? 20 : 30,
          border: "3px solid gold",
          background: "linear-gradient(135deg, #FFF9E6, #FFE4B5)",
          boxShadow: isAvailable
            ? "0 25px 45px rgba(255,215,0,0.35)"
            : "0 20px 35px rgba(0,0,0,0.15)",
          overflow: "hidden",
          position: "relative",
          transform: animateUnlock ? "scale(1.03)" : "scale(1)",
          transition: "all 0.4s ease",
        }}
        bodyStyle={{ padding: isMobile ? 20 : 32 }}
      >
        {/* ✨ Glow */}
        <div
          style={{
            position: "absolute",
            top: -50,
            left: -50,
            width: isMobile ? 80 : 100,
            height: isMobile ? 80 : 100,
            background:
              "radial-gradient(circle, rgba(255,215,0,0.3) 0%, transparent 70%)",
            borderRadius: "50%",
            animation: "spinSlow 10s linear infinite",
          }}
        />

        <div style={{ position: "relative", zIndex: 2 }}>
          {/* ICON */}
          <div
            style={{
              fontSize: isMobile ? 48 : 64,
              marginBottom: isMobile ? 12 : 16,
              animation: isAvailable
                ? "gentleFloat 2s ease-in-out infinite"
                : "none",
              filter: isAvailable ? "none" : "grayscale(0.6)",
            }}
          >
            {isAvailable ? "🎁" : "🔒"}
          </div>
          {isAvailable ? (
            <>
              <h2
                style={{
                  color: "#8B4513",
                  fontSize: isMobile ? 24 : 32,
                  fontWeight: 800,
                  marginBottom: isMobile ? 8 : 12,
                }}
              >
                {isMobile
                  ? currentUi.bonusTitleMobile
                  : currentUi.bonusTitleDesktop}
              </h2>

              <p
                style={{
                  color: "#D2691E",
                  fontSize: isMobile ? 14 : 16,
                  marginBottom: isMobile ? 16 : 20,
                }}
              >
                {isMobile
                  ? currentUi.bonusDescMobile
                  : currentUi.bonusDescDesktop}
              </p>

              {/* BADGES */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: isMobile ? 8 : 16,
                  marginBottom: isMobile ? 20 : 24,
                  flexWrap: "wrap",
                }}
              >
                <div style={badgeStyle(isMobile)}>
                  🎡 {currentUi.luckyWheel}
                </div>
                <div style={badgeStyle(isMobile)}>🏆 {currentUi.goldMedal}</div>
              </div>

              <Button
                type="primary"
                size={isMobile ? "middle" : "large"}
                onClick={onSpin}
                style={{
                  borderRadius: 40,
                  height: isMobile ? 48 : 54,
                  padding: isMobile ? "0 24px" : "0 40px",
                  fontSize: isMobile ? 16 : 18,
                  fontWeight: "bold",
                  background: "linear-gradient(135deg, #faad14, #d48806)",
                  border: "none",
                  boxShadow: "0 15px 30px rgba(250,173,20,0.4)",
                  width: isMobile ? "100%" : "auto",
                }}
              >
                <GiftOutlined />{" "}
                {isMobile ? currentUi.spinMobile : currentUi.spinDesktop} 🎡
              </Button>
            </>
          ) : (
            <>
              <h2
                style={{
                  color: "#8B4513",
                  fontSize: isMobile ? 22 : 28,
                  fontWeight: 800,
                }}
              >
                🎯 Already Played
              </h2>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}

const badgeStyle = (isMobile) => ({
  background: "#fff7e6",
  padding: "8px 14px",
  borderRadius: 20,
  fontWeight: 600,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: isMobile ? "100%" : "auto",
});

