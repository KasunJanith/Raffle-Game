import { Card, Button, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { Wheel } from "react-custom-roulette";
import { useState } from "react";

export default function GamesHome() {
  const navigate = useNavigate();

  const data = [
    {
      option: "අවුරුදු ප්‍රශ්න මාලාව",
      route: "/game1",
      style: { backgroundColor: "#ff7875", textColor: "#fff" },
      icon: "❓",
      description: "අවුරුදු දැනුම පරීක්ෂා කරන්න",
    },
    {
      option: "කැවුම් ගණන හොයමු",
      route: "/game2",
      style: { backgroundColor: "#ffd666", textColor: "#000" },
      icon: "🍘",
      description: "කැවුම් ගණන නිවැරදිව තෝරන්න",
    },
    {
      option: "සැඟවුණු පහන් හොයමු",
      route: "/game3",
      style: { backgroundColor: "#69c0ff", textColor: "#fff" },
      icon: "🔎",
      description: "රූපයේ සැඟවුණු දේ සොයන්න",
    },
    {
      option: "රබානට තට්ටු කරන්න",
      route: "/rabana",
      style: { backgroundColor: "#95de64", textColor: "#000" },
      icon: "🥁",
      description: "ඉක්මනින් රබානට තට්ටු කරන්න",
    },
    {
      option: "කැවුම් අල්ලමු",
      route: "/kavum",
      style: { backgroundColor: "#b37feb", textColor: "#fff" },
      icon: "🎯",
      description: "හැකි තරම් කැවුම් අල්ලමු",
    },
    {
      option: "කණා මුට්ටි බිඳිමු",
      route: "/break",
      style: { backgroundColor: "#ffa940", textColor: "#000" },
      icon: "🏺",
      description: "මුට්ටිය ඉක්මනින් බිඳ දමන්න",
    },
  ];
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const spin = () => {
    if (mustSpin) return;

    const newPrize = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrize);
    setMustSpin(true);
  };

  const handleStop = () => {
    setMustSpin(false);
    const selectedGame = data[prizeNumber];
    navigate(selectedGame.route);
  };

  const quickPlay = (route) => {
    navigate(route);
  };

  return (
    <div className="avurudu-games-container">
      <div className="games-background"></div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "30px 16px" }}>
        <Card
          style={{
            maxWidth: 500,
            margin: "auto",
            marginTop: 30,
            textAlign: "center",
            borderRadius: 20,
            background: "rgba(255,255,255,0.92)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
          }}
        >
          <h1 style={{ fontWeight: "bold", marginBottom: 10 }}>
            🎉 Avurudu Games 🎉
          </h1>

          <p>Spin the wheel and play a random game!</p>

          <div style={{ margin: "20px 0" }}>
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={data}
              onStopSpinning={handleStop}
              outerBorderColor="#f5e20b"
              outerBorderWidth={8}
              innerBorderColor="#ffffff"
              radiusLineColor="#ffffff"
              radiusLineWidth={2}
              fontSize={14}
            />
          </div>

          <Button
            type="primary"
            size="large"
            onClick={spin}
            disabled={mustSpin}
            style={{
              background: "#f5e20b",
              color: "#000",
              fontWeight: "bold",
              borderRadius: 10,
              height: 45,
              border: "none",
            }}
          >
            🎡 {mustSpin ? "Spinning..." : "Spin Now"}
          </Button>
        </Card>
      </div>
    </div>
  );
}
