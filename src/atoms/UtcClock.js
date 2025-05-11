"use client";

import { useEffect, useState } from "react";

const UtcClock = () => {
  const [time, setTime] = useState("00:00:00");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const utcTime = now.toISOString().substr(11, 8); // Get the time in HH:mm:ss format (UTC)
      setTime(utcTime);
    };

    updateClock();
    // Update the clock every second
    const intervalId = setInterval(updateClock, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="font-semibold text-[#FE9B07] text-4xl tracking-wide">
      {time}
    </div>
  );
};

export default UtcClock;
