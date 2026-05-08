import { Wheel } from "react-custom-roulette";
import { useState } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function SpinWheel() {

  const navigate = useNavigate();

  const data = [
    { option: "Game 01" },
    { option: "Game 02" },
    { option: "Game 03" }
  ];

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const spin = () => {
    const newPrize = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrize);
    setMustSpin(true);
  };

  const handleStop = () => {

    setMustSpin(false);

    if (prizeNumber === 0) navigate("/game1");
    if (prizeNumber === 1) navigate("/game2");
    if (prizeNumber === 2) navigate("/game3");

  };

  return (

    <div style={{ textAlign: "center", marginTop: 50 }}>

      <h1>🎡 Spin the Avurudu Wheel</h1>

      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        onStopSpinning={handleStop}
      />

      <Button
        type="primary"
        size="large"
        style={{ marginTop: 20 }}
        onClick={spin}
      >
        Spin
      </Button>

    </div>

  );

}