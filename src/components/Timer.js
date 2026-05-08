import { useEffect, useState } from "react";

export default function Timer({ seconds, onFinish }) {

  const [time, setTime] = useState(seconds);

  useEffect(() => {

    if (time === 0) {
      onFinish();
      return;
    }

    const timer = setTimeout(() => {
      setTime(time - 1);
    }, 1000);

    return () => clearTimeout(timer);

  }, [time]);

  return (
    <>
    
                <div
                  style={{
                    fontSize: 30,
                    fontWeight: 800,
                    color: time <= 2 ? "#E44D2E" : "#d48806",
                  }}
                >
                  {time}s
                </div>
    </>
  );
}