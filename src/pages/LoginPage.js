import { useState, useEffect } from "react";
import { Card, Input, Button, Typography, Row, Col } from "antd";
import { 
  UserOutlined, 
  PhoneOutlined, 
  RightOutlined,
  SafetyOutlined 
} from "@ant-design/icons";
import "./AvuruduLogin.css";

const { Title, Text } = Typography;

// Traditional Avurudu symbols and patterns
const AVURUDU_SYMBOLS = [
  { icon: "🌺", name: "Nelum" },    // Lotus
  { icon: "🥥", name: "Pol" },       // Coconut
  { icon: "🌿", name: "Kohomba" },   // Neem
  { icon: "🏮", name: "Pahan" },      // Oil Lamp
  { icon: "🥣", name: "Kiribath" },   // Milk Rice
  { icon: "🎯", name: "Kana Mutti" }, // Pot Game
];

export default function LoginPage({ setPlayer }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [floatingElements, setFloatingElements] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState(null);

  // Create floating decorative elements
  useEffect(() => {
    const elements = [];
    for (let i = 0; i < 20; i++) {
      elements.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 10 + Math.random() * 10,
        symbol: AVURUDU_SYMBOLS[Math.floor(Math.random() * AVURUDU_SYMBOLS.length)].icon,
        size: 20 + Math.random() * 30,
      });
    }
    setFloatingElements(elements);
  }, []);

  const handleStart = () => {
    if (!name.trim() || !phone.trim()) {
      // Animated error
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000);
      
      // Custom error notification
      const errorMsg = document.createElement('div');
      errorMsg.className = 'avurudu-error-toast';
      errorMsg.innerHTML = '🌸 Please enter your details to start the celebration! 🌸';
      document.body.appendChild(errorMsg);
      setTimeout(() => errorMsg.remove(), 3000);
      return;
    }

    // Celebration animation before proceeding
    setSelectedSymbol(AVURUDU_SYMBOLS[Math.floor(Math.random() * AVURUDU_SYMBOLS.length)]);
    
    setTimeout(() => {
      setPlayer({
        name: name.trim(),
        phone: phone.trim(),
        joinedAt: new Date().toLocaleTimeString(),
        symbol: selectedSymbol?.icon || "🌸",
      });
    }, 1500);
  };

  return (
    <div className="avurudu-container">
      {/* Animated Background with Traditional Patterns */}
      <div className="avurudu-background">
        <div className="pattern-overlay"></div>
        <div className="color-overlay"></div>
        
        {/* Floating Avurudu Elements */}
        {floatingElements.map((el) => (
          <div
            key={el.id}
            className="floating-element"
            style={{
              left: `${el.left}%`,
              animationDelay: `${el.delay}s`,
              animationDuration: `${el.duration}s`,
              fontSize: `${el.size}px`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          >
            {el.symbol}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="avurudu-content">
        {/* Traditional Oil Lamp Animation */}
        <div className="pahan-container">
          <div className="pahan">
            <div className="flame"></div>
            <div className="wick"></div>
            <div className="oil"></div>
          </div>
          <div className="pahan-glow"></div>
        </div>

        {/* Welcome Message with Typewriter Effect */}
        <div className="welcome-message">
          <span className="message-line1">🌸 Ayurveda! 🌸</span>
          <span className="message-line2">WELCOME TO AVURUDU GAMES</span>
          <span className="message-line3">අවුරුදු උත්සවයට සාදරයෙන් පිළිගනිමු</span>
        </div>

        {/* Main Login Card */}
        <Card 
          className={`avurudu-card ${isAnimating ? 'shake-animation' : ''}`}
          bordered={false}
        >
          {/* Decorative Top Border */}
          <div className="card-top-border">
            {AVURUDU_SYMBOLS.map((symbol, index) => (
              <span 
                key={index} 
                className="border-symbol"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {symbol.icon}
              </span>
            ))}
          </div>

          <Title level={1} className="avurudu-title">
            <span className="title-sinhala">අවුරුදු</span>
            <span className="title-english">Avurudu Celebration</span>
          </Title>

          {/* Traditional Auspicious Time Indicator */}
          <div className="auspicious-time">
            <SafetyOutlined className="auspicious-icon" />
            <Text className="auspicious-text">
              Nonagate 6.17 - 8.42
            </Text>
          </div>

          {/* Input Fields with Traditional Decorations */}
          <div className="input-container">
            <div className="input-wrapper">
              <UserOutlined className="input-icon" />
              <Input
                placeholder="Enter your name (ඔබේ නම)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="avurudu-input"
                bordered={false}
                prefix={<span className="input-prefix">🌸</span>}
              />
              <div className="input-underline"></div>
            </div>

            <div className="input-wrapper">
              <PhoneOutlined className="input-icon" />
              <Input
                placeholder="Phone number (දුරකථන අංකය)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="avurudu-input"
                bordered={false}
                prefix={<span className="input-prefix">📞</span>}
              />
              <div className="input-underline"></div>
            </div>
          </div>

          {/* Traditional Symbol Selection */}
          <div className="symbol-selection">
            <Text className="symbol-label">Choose your lucky symbol:</Text>
            <Row gutter={[8, 8]} justify="center">
              {AVURUDU_SYMBOLS.map((symbol, index) => (
                <Col key={index}>
                  <div
                    className={`symbol-option ${selectedSymbol?.icon === symbol.icon ? 'selected' : ''}`}
                    onClick={() => setSelectedSymbol(symbol)}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="symbol-icon">{symbol.icon}</span>
                    <span className="symbol-name">{symbol.name}</span>
                  </div>
                </Col>
              ))}
            </Row>
          </div>

          {/* Start Button with Ripple Effect */}
          <Button
            type="primary"
            block
            onClick={handleStart}
            className="avurudu-start-button"
          >
            <span className="button-content">
              <span className="sinhala-text">ආරම්භ කරන්න</span>
              <span className="english-text">Start Celebration</span>
              <RightOutlined className="button-icon" />
            </span>
            <div className="button-ripple"></div>
          </Button>

          {/* Traditional Saying */}
          <div className="traditional-saying">
            <Text className="saying-text">
              "අහුරුදු උදාවට සුබ පැතුම්"
            </Text>
            <Text className="saying-translation">
              Auspicious greetings for the New Year
            </Text>
          </div>
        </Card>

        {/* Decorative Bottom Elements */}
        <div className="decorative-bottom">
          <div className="traditional-pattern"></div>
          <div className="kovi-pattern"></div>
        </div>
      </div>

      {/* Success Celebration Overlay */}
      {selectedSymbol && (
        <div className="celebration-overlay">
          <div className="celebration-content">
            <span className="celebration-symbol">{selectedSymbol.icon}</span>
            <h2>🌸 Welcome to the Celebration! 🌸</h2>
            <p>Prepare for traditional games & fun!</p>
            <div className="confetti"></div>
          </div>
        </div>
      )}
    </div>
  );
}