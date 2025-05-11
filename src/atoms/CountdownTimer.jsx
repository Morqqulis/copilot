"use client";
import React, { useState, useEffect } from "react";

const segmentsData = {
  news: {
    startMinute: 40,
    color: "text-red-400",
  },
  weather: {
    startMinute: 43,
    color: "text-green-400",
  },
  travel: {
    startMinute: 45,
    color: "text-cyan-400",
  },
};

export default function CountdownTimer({ segmentName, generateHandle }) {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    setTimeLeft(getInitialTimeLeft(segmentsData[segmentName].startMinute));

    // Update the countdown every second
    const countdownTimer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          generateHandle();
          return 3600;
        }
        return prevTime - 1; // Decrement time
      });
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(countdownTimer);
  }, [generateHandle, segmentName]);

  // Calculate hours, minutes, and seconds
  const hours = String(Math.floor(timeLeft / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <span className={`${segmentsData[segmentName].color} font-medium text-lg`}>
      {hours}:{minutes}:{seconds}
    </span>
  );
}

const getInitialTimeLeft = (targetMinutes) => {
  const now = new Date();
  const currentMinutes = now.getMinutes();
  const currentSeconds = now.getSeconds();

  if (currentMinutes < targetMinutes) {
    // If it's before the 40th minute of the current hour
    return (targetMinutes - currentMinutes) * 60 - currentSeconds;
  } else if (currentMinutes === targetMinutes) {
    // If it's exactly the 40th minute
    return 3600; // 1 hour
  } else {
    // If it's past the 40th minute, calculate until the next hour's 40th minute
    const nextHour = now.getHours() + 1; // Move to next hour
    return (60 - currentMinutes + targetMinutes) * 60 - currentSeconds;
  }
};
